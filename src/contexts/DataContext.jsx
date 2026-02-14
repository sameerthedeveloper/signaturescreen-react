import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, writeBatch } from 'firebase/firestore';
import seedData from '../data/seed.json';

const DataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [seriesList, setSeriesList] = useState([]);
    const [processorList, setProcessorList] = useState([]);
    const [installOptions, setInstallOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Theme State
    const [siteTheme, setSiteTheme] = useState('default');

    // Initial load
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try fetching from Firebase
                const seriesSnapshot = await getDocs(collection(db, 'series'));
                const processorSnapshot = await getDocs(collection(db, 'processors'));
                const installSnapshot = await getDocs(collection(db, 'installations'));
                
                // Fetch Settings
                try {
                    const settingsDoc = await getDocs(collection(db, 'settings'));
                     if (!settingsDoc.empty) {
                        const globalSettings = settingsDoc.docs.find(d => d.id === 'global');
                         if (globalSettings) {
                             setSiteTheme(globalSettings.data().theme || 'default');
                         }
                     }
                } catch (err) {
                    console.warn("Settings fetch failed", err);
                }

                if (!seriesSnapshot.empty) {
                    setSeriesList(seriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    setProcessorList(processorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    setInstallOptions(installSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } else {
                    console.warn("Firebase empty or connection failed, using seed data locally.");
                    // Fallback to seed data if empty (or could trigger upload)
                    setSeriesList(seedData.series.map((item, index) => ({ id: `seed-${index}`, ...item })));
                    setProcessorList(seedData.processors.map((item, index) => ({ id: `seed-${index}`, ...item })));
                    setInstallOptions(seedData.installations.map((item, index) => ({ id: `seed-${index}`, ...item })));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Fallback on error (invalid config, etc.)
                setSeriesList(seedData.series.map((item, index) => ({ id: `seed-${index}`, ...item })));
                setProcessorList(seedData.processors.map((item, index) => ({ id: `seed-${index}`, ...item })));
                setInstallOptions(seedData.installations.map((item, index) => ({ id: `seed-${index}`, ...item })));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to re-fetch/update local state
    const refreshData = async () => {
         setLoading(true);
         try {
            const seriesSnapshot = await getDocs(collection(db, 'series'));
            setSeriesList(seriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            
            const processorSnapshot = await getDocs(collection(db, 'processors'));
            setProcessorList(processorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            
            const installSnapshot = await getDocs(collection(db, 'installations'));
            setInstallOptions(installSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const settingsDoc = await getDocs(collection(db, 'settings'));
            if (!settingsDoc.empty) {
                const globalSettings = settingsDoc.docs.find(d => d.id === 'global');
                if (globalSettings) {
                    setSiteTheme(globalSettings.data().theme || 'default');
                }
            }

         } catch(e) {
             console.error("Refresh failed", e);
         } finally {
             setLoading(false);
         }
    };

    const updateTheme = async (newTheme) => {
        setSiteTheme(newTheme);
        try {
            await setDoc(doc(db, 'settings', 'global'), { theme: newTheme }, { merge: true });
        } catch (e) {
            console.error("Failed to save theme setting", e);
        }
    };

    const uploadSeedData = async () => {
        try {
            const batch = writeBatch(db);
            
            seedData.series.forEach((item) => {
                const newDoc = doc(collection(db, 'series')); // Auto-ID
                batch.set(newDoc, item);
            });
            
            seedData.processors.forEach((item) => {
                 const newDoc = doc(collection(db, 'processors'));
                 batch.set(newDoc, item);
            });
            
            seedData.installations.forEach((item) => {
                 const newDoc = doc(collection(db, 'installations'));
                 batch.set(newDoc, item);
            });

            // Set default settings
            const settingsDoc = doc(db, 'settings', 'global');
            batch.set(settingsDoc, { theme: 'default' });

            await batch.commit();
            alert("Seed data uploaded successfully!");
            refreshData();
        } catch (error) {
            console.error("Error uploading seed data:", error);
            alert("Failed to upload seed data. Check console and firebase config.");
        }
    };

    return (
        <DataContext.Provider value={{ 
            seriesList, processorList, installOptions, 
            loading, refreshData, uploadSeedData,
            siteTheme, updateTheme
        }}>
            {children}
        </DataContext.Provider>
    );
};
