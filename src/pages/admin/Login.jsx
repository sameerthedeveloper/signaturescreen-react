import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 w-full max-w-md space-y-8 shadow-xl">
        <div className="text-center space-y-4">
           {/* <img src={logo} alt="Logo" className="h-8 mx-auto opacity-80" /> */}
           <div className="w-12 h-12 bg-black text-white rounded-xl mx-auto flex items-center justify-center text-2xl">✨</div>
           <div>
                <h1 className='font-bold font-stretch-ultra-condensed text-3xl'>Signature Screens</h1>
                <p className="text-sm text-gray-500 font-medium tracking-wide mt-1">ADMIN PORTAL</p>
           </div>
        </div>
        
        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium animate-pulse">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Email</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@signaturescreens.com"
            />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-500">Password</label>
             <input 
               type="password" 
               className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="••••••••"
             />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
