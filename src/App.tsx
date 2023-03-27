import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppContainer from 'containers/App';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Helmet } from 'react-helmet';
import Viewport from 'containers/ViewPort';
import theme from 'styles/theme';
import BF from 'assets/images/default.png';
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
                <meta property="og:url" content="https://bel-frontend.online" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={'Беларускі франтэнд ды іншая трасца'}
                />
                <meta
                    property="og:description"
                    content={'Беларускамоўны блог пра IT ды інш.'}
                />
                <meta property="og:image" content={BF} />

                <meta name="twitter:card" content={BF} />
                <meta property="twitter:domain" content="bel-frontend.online" />
                <meta
                    property="twitter:url"
                    content="https://bel-frontend.online"
                />
                <meta
                    name="twitter:title"
                    content={'Беларускі франтэнд ды іншая трасца'}
                />
                <meta
                    name="twitter:description"
                    content={'Беларускамоўны блог пра IT ды інш.'}
                />
                <meta name="twitter:image" content={BF} />
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
