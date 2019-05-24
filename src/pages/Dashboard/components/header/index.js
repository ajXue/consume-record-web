import React, { Component } from 'react';
import "./index.scss"

class dashboardHeader extends Component {
    render() {
        return (
            <div className="dashboard__header clearfix">
                <div className='dashboard__header__welcom cs-left'>
                    <img className="dashboard__header__img" src="images/dashboard/avator.png" width="72" height="72" alt="" />
                    <div>
                        <p className="dashboard__header__pTop">xue，祝你开心每一天！</p>
                        <p className="dashboard__header__pBot">hello world</p>
                    </div>
                </div>
                <div className='cs-right'>
                    
                </div>
            </div>
        );
    }
}

export default dashboardHeader;