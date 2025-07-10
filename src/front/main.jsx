import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BackendURL } from './components/BackendURL';
import Layout from './pages/Layout.jsx';

console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
        return (
            <React.StrictMode>
                <BackendURL />
            </React.StrictMode>
        );
    }

    return (
        <React.StrictMode>
            <Layout />
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);