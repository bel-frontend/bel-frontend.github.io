import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppContainer from 'containers/App';
import theme from 'styles/theme';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
