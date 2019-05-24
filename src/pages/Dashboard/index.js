import React, { Component } from 'react';

import "./index.scss";
import Header from "./components/header";
import CosumeList from "./components/CosumeList";

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard-container">
                <Header />
                <CosumeList />
            </div>
        );
    }
}

export default Dashboard;