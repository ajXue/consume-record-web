import React, { Component } from 'react';

import "./index.css";

class Home extends Component {
    render() {
        return (
            <div className="homeContainer">
                {this.props.children}
            </div>
        );
    }
}

export default Home;