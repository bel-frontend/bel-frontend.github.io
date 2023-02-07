import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from 'containers/App';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
    );
}

export default App;
