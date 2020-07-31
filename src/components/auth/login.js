import React, { Component, Fragment } from 'react'
import LoginTabset from './loginTabset';
import stats from '../../assets/images/dashboard/stats.png';
import { Store } from '../../Store';

function Login(){

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="authentication-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 p-0 card-left">
                                <div className="card bg-primary">
                                    <div className="svg-icon">
                                        <img src={stats} className="Img-fluid" />
                                    </div>
                                    <h3>Welcome to Satavan</h3>
                                </div>
                            </div>
                            <div className="col-md-7 p-0 card-right">
                                <div className="card tab2-card">
                                    <div className="card-body">
                                        <LoginTabset />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )    
}

export default Login
