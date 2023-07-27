import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppContainer from 'containers/App';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Helmet } from 'react-helmet';
import Viewport from 'containers/ViewPort';
import theme from 'styles/theme';
import BF from 'assets/images/default.jpg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return (
        <>
            <Helmet>
                <title>Bel-Geek.com - Тэхналогіі і Навука</title>
                <meta
                    name="description"
                    content="Bel-Geek.com - Тэхналогіі і Навука На Беларускай Мове"
                />
                <meta property="og:url" content="https://bel-frontend.online" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={'Bel-Geek.com - Тэхналогіі і Навука'}
                />
                <meta
                    property="og:description"
                    content={'Bel-Geek.com - Тэхналогіі і Навука'}
                />
                <meta
                    property="og:image"
                    content={`https://bel-frontend.online${BF}`}
                />

                <meta
                    name="twitter:card"
                    content={`https://bel-frontend.online${BF}`}
                />
                <meta property="twitter:domain" content="bel-frontend.online" />
                <meta
                    property="twitter:url"
                    content="https://bel-frontend.online"
                />
                <meta
                    name="twitter:title"
                    content={'Bel-Geek.com - Тэхналогіі і Навука'}
                />
                <meta
                    name="twitter:description"
                    content={'Bel-Geek.com - Тэхналогіі і Навука'}
                />
                <meta
                    name="twitter:image"
                    content={`https://bel-frontend.online${BF}`}
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
