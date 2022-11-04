import React, { useEffect } from 'react';
import './styles/App.scss';
import DatabaseProvider from './components/Common/DataBaseProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom';
import theme from './styles/Theme';
import HomePage from './components/Home/HomePage';
import { SocketContextProvider } from './hooks/webSocketHook';
import initUpdates from './redux/initUpdate';

initUpdates();
function App() {
	return (
		<main className="container">
			<SocketContextProvider>
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
			</SocketContextProvider>
		</main>
	);
}

export default App;
