import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppContainer from 'containers/App';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Helmet } from 'react-helmet';
import Viewport from 'containers/ViewPort';
import theme from 'styles/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
        <>
            <Helmet>
                <title>Беларускі франтэнд ды іншая трасца</title>
                <meta
                    name="description"
                    content="Беларускамоўны блог пра IT ды інш."
                />
            </Helmet>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Viewport />
                    <BrowserRouter>
                        <AppContainer />
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default App;
