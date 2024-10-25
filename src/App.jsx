import React, { useState } from 'react';
import cvsulogo from './assets/cvsulogo/cvsu-logo.png';
import eyeclosed from './assets/eyeclosed/eye-closed.png'; 
import BcoorCampus from './assets/BcoorCampus/bacoor-campus.png';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); 
    console.log('Logging in with:', username, password);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6 mt-4 relative">
      <div className="flex-1 flex items-center justify-center p-2 m-2 bg-white rounded-lg z-10">
        <div className="p-4 md:p-6 rounded-lg max-w-xs w-full">
          <div className="flex items-center mb-5">
            <img src={cvsulogo} alt='Cvsu Logo' className="mr-2 w-12" />
            <h1 className="text-[#004d00] font-bold text-2xl">
              CAVITE STATE UNIVERSITY BACOOR CAMPUS
            </h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#004d00]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mr-2">Password</label>
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#004d00]"
                  required
                />
                <div className="bg-gray-300 rounded p-2 cursor-pointer ml-1" onClick={() => setShowPassword(!showPassword)}>
                  <img
                    src={eyeclosed} 
                    alt='Toggle Password Visibility'
                    className="w-5 h-auto"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="p-2 bg-[#004d00] text-white rounded mb-2 flex items-center justify-center">
              <span className="text-lg mr-2">Sign in</span> 
              <span className="text-2xl">→</span> 
            </button>
            <div className="text-center mt-5">
              <span className="cursor-default">Forgot password?</span>
              <br />
              <div className="my-5 border-b border-gray-600 mx-5" style={{ width: '100%' }}></div>
            </div>
            <div className="text-center mt-5">
              <span className="cursor-default">Don't have an account yet?</span>
              <br />
              <button type="button" className="p-2 bg-[#004d00] text-white rounded mt-2">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 h-[800px] relative">
        <img 
          src={BcoorCampus} 
          alt='Bacoor Campus' 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="md:hidden absolute inset-1 h-full">
        <img 
          src={BcoorCampus} 
          alt='Bacoor Campus' 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default App;
