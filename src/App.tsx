import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppContainer from 'containers/App';
import { Provider } from 'react-redux';
import { store } from 'store';
import theme from 'styles/theme';
import 'bootstrap/dist/css/bootstrap.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <AppContainer />
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
