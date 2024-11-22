import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import CreatePool from './pages/CreatePool';
import IDOView from './pages/IDOView';
import BlockList from './pages/BlockList';
import Footer from './layouts/Footer';
import IDODetail from './pages/IDODetail';
import NotFound from './pages/NotFound';

import './styles/layouts/app.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<CreatePool />} />
            <Route path="/create" element={<CreatePool />} />
            <Route path="/pools" element={<IDOView />} />
            <Route path="/block" element={<BlockList />} />
            <Route path="/pools/:poolId" element={<IDODetail />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
