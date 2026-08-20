import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import AppRoutes from './routes/AppRoutes';
import { useAuthStore } from './store/authStore';

function App() {
	const initialize = useAuthStore((state) => state.initialize);

	useEffect(() => {
		initialize();
	}, [initialize]);

	return (
		<BrowserRouter>
			<ScrollToTop />
			<AppRoutes />
		</BrowserRouter>
	);
}

export default App;
