import React, { Component } from 'react';
import { Row, Col, Icon } from "antd";
import "./index.css";

class Header extends Component {
    state = {
        collapsed: true
    }

    componentWillMount() {
        const username = "xue";
        this.setState({
            username,
        })
    }
    
    /**
     * 点击切换左侧栏 
     */
    toggleCollapsed= () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
        this.props.collapsed(this.state.collapsed);
    }

    render() {
        return (
            <div className="headerContainer">
                <Row>
                    <Col span={24}>
                    <span onClick={this.toggleCollapsed} style={{display: "inline-block", fontSize: "20px", marginTop: "7px"}}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </span>
                        <p className="headerContainer__username">欢迎，{ this.state.username }</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>

                    </Col>
                    <Col span={20}></Col>
                </Row>
                
            </div>
        );
    }
}

export default Header;