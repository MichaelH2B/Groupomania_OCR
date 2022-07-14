import React from 'react';
import { Routes, Route } from "react-router-dom"; 
import Auth from './pages/Auth';
import Home from './pages/Home'; 
 
const App = () => {  
	return( 
		<Routes>
            <Route path= "/" element={<Auth />} />
            <Route path= "/accueil" element={<Home />} /> 
        </Routes> 
	)
};

export default App 