import React from 'react';
import { Layout } from '../Common/Layout';

export const About = () => (
    <Layout noPadding textContainer>
        <h1 className="text-center">
            À propos de { process.env.REACT_APP_MARKETPLACE_NAME }
        </h1>
        <div className="row m-0 py-4">
            <div className="col-md-6 py-2">
                <iframe
                    title={`marketplace map`}
                    className="w-100 rounded"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.843367638798!2d3.024118115737903!3d50.630026479500536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d567fe99b257%3A0xa1541ac9c674f3dd!2s71+Rue+du+G%C3%A9n%C3%A9ral+de+la+Bourdonnaye%2C+59000+Lille!5e0!3m2!1sfr!2sfr!4v1558390371057!5m2!1sfr!2sfr"
                    frameBorder="0" />
            </div>
            <div className="col-md-6 py-2">
                <div className="d-flex align-items-center h-100">
                    <div className="d-block m-auto">
                        <h5 className="d-block w-100">
                            <i className="far fa-envelope"/> Email: <a href={`mailto:${ process.env.REACT_APP_MARKETPLACE_EMAIL }`}>{ process.env.REACT_APP_MARKETPLACE_EMAIL }</a>
                        </h5>
                        <h5 className="d-block w-100">
                            <i className="fas fa-phone"/> Phone: <a href={`tel:${ process.env.REACT_APP_MARKETPLACE_PHONE }`}>{ process.env.REACT_APP_MARKETPLACE_PHONE }</a>
                        </h5>
                        <h5 className="d-block w-100">
                            <i className="fas fa-map-marker-alt"/> Adresse: { process.env.REACT_APP_MARKETPLACE_LOCATION }
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
)
