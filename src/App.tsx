import React from "react";
import "./App.css";
import DatabaseProvider from "./components/Common/DataBaseProvider";
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import theme from './Theme';
import HomePage from './components/Home/HomePage';

function App() {
  return (
    <main className="container">
      <DatabaseProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              {/*<Route path="/recipes/:id" element={<Recipe />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/newrecipe" element={<RecipeForm />} />
              <Route path="/login" element={<Login />} />
							<Route path='/currentcocktailclub' element={<CurrentCocktailClub/>}/>
              <Route path="*" element={<Navigate to="/recipes" replace />} />*/}
							<Route path="/home" element={<HomePage />} />
							<Route path="*" element={<Navigate to="/home" replace />} />*/
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </DatabaseProvider>
    </main>
  );
}

export default App;
