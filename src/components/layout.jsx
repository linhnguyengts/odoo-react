import React, { Component } from 'react'
import Sidebar from './common/sidebar_components/sidebar';
import Right_sidebar from './common/right-sidebar';
import Footer from './common/footer';
import Header from './common/header_components/header';

function Layout(props){
    const [divName, setDivName] = React.useState('LTR');
    React.useEffect(() => {
        if(divName === 'RTL') {
            document.body.classList.add('rtl');
        }else{
            document.body.classList.remove('rtl');
        }
    }, [divName]);

    const ChangeRtl = () => {
        setDivName( divName == 'RTL' ? 'LTR': 'RTL');
    }    
    return (
        <>
            <div className="page-wrapper" >
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar />
                    <Right_sidebar />
                    <div className="page-body">
                        {props.children}
                    </div>
                    <Footer />
                </div>
            </div>
            <div className="btn-light custom-theme" onClick={ChangeRtl}>{divName}</div>
        </>
    )
}
export default Layout