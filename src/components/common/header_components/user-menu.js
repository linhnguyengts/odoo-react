import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
//images import
import man from '../../../assets/images/dashboard/man.jpg'
import { baseapi } from '../../../constants/config';
import { Store } from '../../../Store';

function User_menu(){
    const { state, dispatch } = React.useContext(Store);
    const { session } = state;    
    const onLogout = ()  => {
        localStorage.removeItem('odoo_react_sale');
        dispatch({ type: 'logout'});
    }
    return (
        <Fragment>
                <li className="onhover-dropdown">
                    <div className="media align-items-center">
                        <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={`${baseapi}/web/image?model=res.users&field=image_small&id=${session.uid}`} alt="header-user" />
                        <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                        <li><Link to={`${process.env.PUBLIC_URL}/settings/profile`} ><i data-feather="user"></i>Edit Profile</Link></li>
                        <li><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li>
                        <li><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li>
                        <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li>
                        <li onClick={onLogout}><i data-feather="log-out"></i>Logout</li>
                    </ul>
                </li>
        </Fragment>
    )
}

export default User_menu
