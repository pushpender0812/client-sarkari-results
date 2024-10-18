import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
  const storedCount = localStorage.getItem("pageVisits");
  const initialCount = storedCount ? Number(storedCount) : 0;
  setCount(initialCount + 1);
  localStorage.setItem("pageVisits", initialCount + 1);
}, []); 

 



    return (
      
      <footer className=" bg-slate-600 text-white py-8 grid-flow-row mt-48 shadow-2xl shadow-black rounded-2xl">
        
        <div className="container mx-auto text-center">
          
          <div className="flex justify-center space-x-6 mb-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="Facebook" 
                className="h-8 w-8 rounded-full" 
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <img 
                src="data:image/png;base64,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" 
                alt="Twitter" 
                className="h-8 w-8 rounded-full" 
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="Instagram" 
                className="h-8 w-8 rounded-full" 
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
              <img 
                src="data:image/png;base64,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" 
                alt="LinkedIn" 
                className="h-8 w-8 rounded" 
              />
            </a>
            <p>Total Visitors : {count}</p>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Py. All rights reserved.</p>
          
        </div>
      </footer>
    
    );
};

export default Footer;
