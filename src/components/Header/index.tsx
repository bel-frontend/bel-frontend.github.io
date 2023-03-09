import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export const Header = () => {
    return (
        <header className="intro-header">
            <div className="pageContainer">
                <div className="row justify-content-center container-inner-height">
                    <div className="col-lg-10  col-md-10">
                        <div className="site-heading">
                            <Link to="/">
                                <h1 className="header">Беларускі франтэнд</h1>
                            </Link>
                            <hr className="small" />
                            <h2 className="subheading">Ды іншая трасца</h2>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
