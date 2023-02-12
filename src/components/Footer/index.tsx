import React from 'react';
import './style.scss';

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <ul className="list-inline text-center">
                            <li></li>
                        </ul>
                        <p className="copyright text-muted">
                            Copyright &copy; Беларускі франтэнд 2023
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
