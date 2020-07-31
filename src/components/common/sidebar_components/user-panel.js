import React, { Component } from 'react'
import { baseapi } from '../../../constants/config';
import { Store } from '../../../Store';

function User_panel() {
    const { state, dispatch } = React.useContext(Store);
    const { session } = state;     
    return (
        <div>
            <div className="sidebar-user text-center">
                <div><img className="img-60 rounded-circle lazyloaded blur-up" src={`${baseapi}/web/image?model=res.users&field=image_small&id=${session.uid}`} alt="#" />
                </div>
                <h6 className="mt-3 f-14">{session.name}</h6>
                <p>Sale</p>
            </div>
        </div>
    )   
}

export default User_panel

