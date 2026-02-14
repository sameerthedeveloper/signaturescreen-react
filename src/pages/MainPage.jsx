import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import CustomerConfig from '../components/CustomerConfig';
import SeriesConfig from '../components/SeriesConfig';
import DimensionConfig from '../components/DimensionConfig';
import AreaConfig from '../components/AreaConfig';
import PixelConfig from '../components/PixelConfig';
import PanelPricing from '../components/PanelPricing';
import ProcessorConfig from '../components/ProcessorConfig';
import InstallationConfig from '../components/InstallationConfig';
import FinalCost from '../components/FinalCost';
import Quotation from '../components/Quotation';
import BottomNav from '../components/BottomNav';
import { useData } from '../contexts/DataContext';

// Constants kept for default/fallback or component logic references
const LEDGST = 28;
const processorGST = 18;

function MainPage() {
  const { seriesList, processorList, installOptions, loading, siteTheme } = useData();
  const [activeTab, setActiveTab] = useState('home');

  // Input State
  const [series, setSeries] = useState('');
  const [hPanels, setHPanels] = useState('');
  const [vPanels, setVPanels] = useState('');
  const [extraPanels, setExtraPanels] = useState(''); // New state for additional panels
  const [msp, setMsp] = useState(''); // Price input in Area Config
  const [customPanelPrice, setCustomPanelPrice] = useState('');
  const [selectedProcessor, setSelectedProcessor] = useState('');
  const [customProcessorName, setCustomProcessorName] = useState('');
  const [customProcessorPrice, setCustomProcessorPrice] = useState('');
  const [selectedInstall, setSelectedInstall] = useState('');
  const [customInstallPrice, setCustomInstallPrice] = useState('');

  // Customer State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quotationDate, setQuotationDate] = useState(new Date().toISOString().split('T')[0]);

  // Toggles
  const [includeProcessor, setIncludeProcessor] = useState(true);
  const [includeInstallation, setIncludeInstallation] = useState(true);

  // Set default series when loaded - REMOVED to allow disabled default
  // useEffect(() => {
  //   if (seriesList.length > 0 && !series) {
  //       setSeries(seriesList[0].value);
  //   }
  // }, [seriesList, series]);

  // useEffect(() => {
  //   if (processorList.length > 0 && !selectedProcessor) {
  //       setSelectedProcessor(processorList[0].value);
  //   }
  // }, [processorList, selectedProcessor]);

  // useEffect(() => {
  //   if (installOptions.length > 0 && !selectedInstall) {
  //       setSelectedInstall(installOptions[0].value);
  //   }
  // }, [installOptions, selectedInstall]);

  // Find current series object
  const currentSeriesObj = seriesList.find(s => s.value === series) || {};
  const currentHPixel = currentSeriesObj.hPixel || 0;
  const currentVPixel = currentSeriesObj.vPixel || 0;
  const currentCost = currentSeriesObj.cost || 0;

  // Calculations
  const hVal = parseInt(hPanels) || 0;
  const vVal = parseInt(vPanels) || 0;
  const totalPanels = hVal * vVal;
  const extraVal = parseInt(extraPanels) || 0;
  const grandTotalPanels = totalPanels + extraVal;

  // Dimensions
  const heightMm = hVal * 337.5;
  const widthMm = vVal * 600;
  
  const diagInInches = Math.sqrt(heightMm ** 2 + widthMm ** 2) / 25.4;
  
  const widthFt = widthMm / 304.8;
  const heightFt = heightMm / 304.8;
  
  const widthIn = widthMm / 25.4;
  const heightIn = heightMm / 25.4;
  
  const widthWw = widthMm + 100;
  const heightWw = heightMm + 100;
  
  // Area
  const areaMm = (heightMm * widthMm) / 1000000;
  const areaFt = (heightMm * widthMm) / 92900;
  
  const pricePerSqM = areaMm * (parseFloat(msp) || 0);

  // Pixels
  const vPixels = vVal * currentVPixel;
  const hPixels = hVal * currentHPixel;
  const totalPixels = vPixels * hPixels;

  // Pricing
  // Panel Price
  let basePanelPrice = currentCost;
  let finalPanelPrice = 0;
  
  // Priority: Area Config Price (msp) > Custom Panel Price > Default
  const mspValue = parseFloat(msp);
  if (!isNaN(mspValue) && mspValue > 0) {
      finalPanelPrice = mspValue;
  } else {
      const customVal = parseFloat(customPanelPrice);
      if (!isNaN(customVal) && customVal > 0) {
          finalPanelPrice = customVal;
      } else {
          finalPanelPrice = basePanelPrice;
      }
  }
  
  const totalPanelPriceExclGst = finalPanelPrice * totalPanels;
  const extraPanelsCost = finalPanelPrice * extraVal;
  const combinedPanelPriceExclGst = totalPanelPriceExclGst + extraPanelsCost;

  const totalPanelGst = combinedPanelPriceExclGst * (LEDGST / 100);
  const totalPanelPriceInclGst = combinedPanelPriceExclGst + totalPanelGst;

  // Processor Price
  const processorObj = processorList.find(p => p.value === selectedProcessor);
  let baseProcessorCost = processorObj ? processorObj.cost : 0;
  let finalProcessorCost = parseFloat(customProcessorPrice);
  if (isNaN(finalProcessorCost) || finalProcessorCost <= 0) {
      finalProcessorCost = baseProcessorCost;
  }
  
  const processorGstVal = finalProcessorCost * (processorGST / 100);
  const processorPriceInclGst = finalProcessorCost + processorGstVal;

  // Installation Price
  const installObj = installOptions.find(i => i.value === selectedInstall);
  let baseInstallCost = installObj ? installObj.cost : 0;
  let finalInstallCost = parseFloat(customInstallPrice);
  if (isNaN(finalInstallCost) || finalInstallCost <= 0) {
      finalInstallCost = baseInstallCost;
  }
  
  let installRatio = 0;
  if(installObj && installObj.cost > 0) {
      installRatio = installObj.gst / installObj.cost;
  } else {
      installRatio = 1.18; // Default to 18% if nothing selected? or 0?
  }
  
  // If no install selected, cost is 0.
  const installPriceInclGst = finalInstallCost > 0 ? (finalInstallCost * (installRatio || 1.18)) : 0;


  // Totals
  let grandTotalExclGst = combinedPanelPriceExclGst + (includeProcessor ? finalProcessorCost : 0) + (includeInstallation ? finalInstallCost : 0);
  let grandTotalInclGst = totalPanelPriceInclGst + (includeProcessor ? processorPriceInclGst : 0) + (includeInstallation ? installPriceInclGst : 0);
  
  const optionalWarrantyCost = Math.round(grandTotalExclGst * 0.05);

  // Data for Quotation Prop
  const quotationData = {
    series: currentSeriesObj.label || 'Unknown Series',
    whpanels: `${vVal} x ${hVal}`,
    totalPanels: totalPanels,
    extraPanels: extraVal,
    grandTotalPanels: grandTotalPanels,
    diagonal: diagInInches.toFixed(2),
    areaft: areaFt.toFixed(2),
    resolution: `${vPixels} x ${hPixels}`,
    pixels: totalPixels.toLocaleString(),
    
    panelprice: totalPanelPriceExclGst.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    extraPanelsCost: extraPanelsCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    combinedPanelPrice: combinedPanelPriceExclGst.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    panelGST: totalPanelPriceInclGst.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    
    processor: customProcessorName || (processorObj ? processorObj.label : ''),
    processorCost: finalProcessorCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    processorGST: processorPriceInclGst.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    
    installCost: finalInstallCost.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    installGST: installPriceInclGst.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    
    totalCost: grandTotalExclGst.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    totalGST: (grandTotalInclGst).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2}),
    
    wwDimension: '', 
    wwMmStr: `${widthWw.toFixed(2)} x ${heightWw.toFixed(2)}`,
    wwInStr: `${(widthWw/25.4).toFixed(2)} x ${(heightWw/25.4).toFixed(2)}`,
    hwMmStr: `${widthMm.toFixed(2)} x ${heightMm.toFixed(2)}`,
    hwInStr: `${widthIn.toFixed(2)} x ${heightIn.toFixed(2)}`,
    
    optionalWarrantyCost: optionalWarrantyCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
    
    hasProcessor: includeProcessor && finalProcessorCost > 0,
    hasInstall: includeInstallation && finalInstallCost > 0,

    customerName,
    customerEmail,
    customerPhone,
    quotationDate
  };

  const dimensionProps = {
      diagonal: diagInInches.toFixed(2),
      widthFt: widthFt.toFixed(2),
      heightFt: heightFt.toFixed(2),
      widthIn: widthIn.toFixed(2),
      heightIn: heightIn.toFixed(2),
      widthMm: widthMm.toFixed(2),
      heightMm: heightMm.toFixed(2),
      widthWw: widthWw.toFixed(2),
      heightWw: heightWw.toFixed(2)
  };

  const themeClasses = useMemo(() => {
    if (siteTheme === 'professional') {
        return {
            bg: 'bg-gradient-to-br from-slate-100 to-slate-200',
            scrollbar: 'scrollbar-thumb-slate-400'
        };
    }
    return {
        bg: 'bg-gray-100',
        scrollbar: 'scrollbar-thumb-gray-300'
    };
  }, [siteTheme]);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading Data...</div>;

  return (
    <div className={`h-screen w-full overflow-hidden fixed inset-0 dark:bg-gray-900 dark:text-white lg:pb-0 ${themeClasses.bg}`}>
      <Header />
      
      <div className={`flex flex-col lg:flex-row lg:gap-8 lg:justify-center lg:items-start p-4 lg:p-8 pt-20 lg:pt-24 lg:h-full`}>
         
         {/* LEFT COLUMN - Configuration Panel */}
         <div className={`home w-full lg:w-[450px] shrink-0 h-[calc(100vh-150px)] lg:h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-hide ${activeTab === 'home' ? 'block' : 'hidden lg:block'}`}>
            <SeriesConfig value={series} onChange={setSeries} seriesList={seriesList} />
            
            <DimensionConfig 
                hPanels={hPanels} setHPanels={setHPanels}
                vPanels={vPanels} setVPanels={setVPanels}
                totalPanels={totalPanels}
                dimensions={dimensionProps}
            />

            <AreaConfig 
                areaMm={areaMm.toFixed(2)}
                areaFt={areaFt.toFixed(2)}
                msp={msp} setMsp={setMsp}
                pricePerSqM={pricePerSqM.toFixed(2)}
            />

            <PixelConfig 
                hPixels={hPixels}
                vPixels={vPixels}
                totalPixels={totalPixels.toLocaleString()}
            />

            <PanelPricing 
                pricePerPanel={finalPanelPrice.toLocaleString(undefined, {minimumFractionDigits: 2})} 
                customPrice={customPanelPrice} 
                setCustomPrice={setCustomPanelPrice}
                totalPriceExclGst={combinedPanelPriceExclGst.toLocaleString(undefined, {minimumFractionDigits: 2})}
                totalPriceInclGst={totalPanelPriceInclGst.toLocaleString(undefined, {minimumFractionDigits: 2})}
                extraPanels={extraPanels}
                setExtraPanels={setExtraPanels}
            />

            <ProcessorConfig 
                processorList={processorList}
                selectedProcessor={selectedProcessor} 
                setSelectedProcessor={setSelectedProcessor}
                processorPriceExclGst={finalProcessorCost.toLocaleString(undefined, {minimumFractionDigits: 2})}
                processorPriceInclGst={processorPriceInclGst.toLocaleString(undefined, {minimumFractionDigits: 2})}
                customPrice={customProcessorPrice}
                setCustomPrice={setCustomProcessorPrice}
                customName={customProcessorName}
                setCustomName={setCustomProcessorName}
                includeProcessor={includeProcessor}
                setIncludeProcessor={setIncludeProcessor}
            />

            <InstallationConfig 
                installOptions={installOptions}
                selectedInstall={selectedInstall}
                setSelectedInstall={setSelectedInstall}
                installPrice={finalInstallCost.toLocaleString(undefined, {minimumFractionDigits: 2})}
                installCustomPrice={customInstallPrice}
                setInstallCustomPrice={setCustomInstallPrice}
                installPriceInclGst={installPriceInclGst.toLocaleString(undefined, {minimumFractionDigits: 2})}
                includeInstallation={includeInstallation}
                setIncludeInstallation={setIncludeInstallation}
            />

            <FinalCost 
                grandTotalExclGst={grandTotalExclGst.toLocaleString(undefined, {minimumFractionDigits: 2})}
                grandTotalInclGst={grandTotalInclGst.toLocaleString(undefined, {minimumFractionDigits: 2})}
            />
         </div>

         {/* RIGHT COLUMN - Invoice/Quotation Content */}
         <div className={`quta w-full lg:flex-1 lg:max-w-[800px] lg:h-[calc(100vh-120px)] h-[calc(100vh-150px)] overflow-y-auto pr-2 scrollbar-hide ${activeTab === 'invoice' ? 'block' : 'hidden lg:block'}`}>
             
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 dark:text-white">Quotation Preview</h2>
                <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">Enter customer details and generate PDF</p>
                
                <CustomerConfig 
                    name={customerName} setName={setCustomerName}
                    email={customerEmail} setEmail={setCustomerEmail}
                    phone={customerPhone} setPhone={setCustomerPhone}
                    date={quotationDate} setDate={setQuotationDate}
                />
            </div>
            
             <Quotation 
                quotation={quotationData}
             />
         </div>
      </div>

       <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default MainPage;
