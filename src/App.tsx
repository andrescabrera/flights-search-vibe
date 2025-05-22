import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import { FlightSearchProvider } from './context/FlightSearchContext';

const App: React.FC = () => {
  return (
    <FlightSearchProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </Layout>
    </FlightSearchProvider>
  );
};

export default App;