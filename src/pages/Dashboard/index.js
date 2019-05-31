import React, { Component } from 'react';

import "./index.scss";
import Header from "./components/header";
import CosumeList from "./components/CosumeList";
// import PageLoading from '../../components/PageLoading';

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard-container">
                <Header />
                <CosumeList loading= {true} />
            </div>
        );
    }
}

export default Dashboard;