import React, { VFC } from 'react';
import './App.css';
import { IndexRoutes } from './features/routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App: VFC = () => (
    <Router>
        <IndexRoutes />
    </Router>
);

export default App;
