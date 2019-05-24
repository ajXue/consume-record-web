import React from 'react'
// import { Layout, Menu, Icon } from 'antd';
import "./index.scss";

// const { Header, Sider, Content } = Layout;

import Header from '../../components/Header'
import Sider from '../../components/Sider'
// import Home from '../../components/Home'

class Layout extends React.Component {
  state = {
    collapsedBol: false,
  };

  handleCollapsed = v => {
    this.setState({collapsedBol: v});
  }

  render() {
    return (
      <div className="containerAll">
          <div className="leftContainer">
              <Sider collapsedBol={this.state.collapsedBol} />
          </div>
          <div className="rightContainer" style={{width: this.state.collapsedBol? "calc(100% - 80px)": "calc(100% - 200px)"}}>
              <Header collapsed={this.handleCollapsed.bind(this)} />
              <div>
                  {this.props.children}
              </div> 
          </div>
      </div>
    );
  }
}

export default Layout;