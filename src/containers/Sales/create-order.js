import React, { Component ,Fragment} from 'react'
import Breadcrumb from '../../components/common/breadcrumb';
import Tabset from './tabset';

function CreateOrder(props) {
    return (
        <Fragment>
            <Breadcrumb title="Create Order" parent="Sale" />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <Tabset />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CreateOrder;

