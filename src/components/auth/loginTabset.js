import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { baseapi, database } from '../../constants/config';

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    changeInput = (e, field) => {
        this.setState({[field]: e.target.value});
    }

    routeChange = () => {
        const { email, password } = this.state;
        var params = {
            db: database,
            login: email,
            password: password
          };
        
        var json = JSON.stringify({ params: params });

        axios({
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json', 
                'Accept': 'application/json'
            },    
            url: `${baseapi}/web/session/authenticate`,
            data: json,         
      
        }).then(response => {
            if(response.data.result.uid){
                this.props.history.push(`${process.env.PUBLIC_URL}/sales/orders`);
            } else {

            }
        });         
        //this.props.history.push(`${process.env.PUBLIC_URL}/sales/orders`);
      }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <Fragment>
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon" >
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Login</Tab>
                            
                        </TabList>

                        <TabPanel>

                                <div className="form-group">
                                    <input 
                                        required="" 
                                        className="form-control" 
                                        placeholder="Username" 
                                        value={email}
                                        onChange={(e) => this.changeInput(e, 'email')}
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        required="" 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e) => this.changeInput(e, 'password')}
                                    />
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                                    <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                        Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                                </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary"  onClick={() => this.routeChange()}>Login</button>
                                </div>
 
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                    </Tabs>
                </Fragment>
            </div>
        )
    }
}

export default withRouter(LoginTabset)

