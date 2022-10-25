import React from 'react';
import './styles/App.scss';
import DatabaseProvider from './components/Common/DataBaseProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes, BrowserRouter, Navigate, HashRouter } from 'react-router-dom';
import theme from './styles/Theme';
import HomePage from './components/Home/HomePage';
import { initConnection } from './socket';
import socket from './socket';
import initUpdates from './redux/initUpdate';

initUpdates();
function App() {
	return (
		<main className="container">
			<DatabaseProvider>
				<ChakraProvider theme={theme}>
					<HashRouter>
						<Routes>
							<Route path="/home" element={<HomePage />} />
							<Route path="*" element={<Navigate to="/home" replace />} />
						</Routes>
					</HashRouter>
				</ChakraProvider>
			</DatabaseProvider>
		</main>
	);
}

export default App;
