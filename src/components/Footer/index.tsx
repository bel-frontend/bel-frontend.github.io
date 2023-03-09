import React from 'react';
import moment from 'moment/moment';

import './style.scss';

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="pageContainer">
                    <p className="copyright text-muted">
                        Copyright &copy; Беларускі франтэнд{' '}
                        {moment(new Date()).format('YYYY')}
                    </p>
                </div>
            </div>
        </footer>
    );
};
