import React from 'react';
import './style.scss';

export const Header = () => {
    return (
        <header className="intro-header">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10  col-md-10">
                        <div className="site-heading">
                            <a href="/">
                                <h1 className="header">Беларускі франтэнд</h1>
                            </a>
                            <hr className="small" />
                            <h2 className="subheading">Ды іншая трасца</h2>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
