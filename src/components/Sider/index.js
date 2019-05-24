import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuConfig from '../../router/menuConfig'
import defaultSetting from '../../config/defaultSetting'
import "./index.css"

const SubMenu = Menu.SubMenu;


class Sider extends Component {
    rootSubmenuKeys = [];
    state = {
        openKeys: ['sub1'],
    }

    componentWillMount() {
        const [menuTreeNode, {adminName}] = [this.renderMenu(menuConfig) , defaultSetting];
        this.rootSubmenuKeys = this.filterMenuKey(menuConfig);

        this.setState({
            menuTreeNode,
            adminName
        })
    }

    /**
     * 只能打开一级菜单 
     */
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    };

    // 查询插入key
    filterMenuKey = (data, arr) => {
        return data.map( item => {
            return item.key;
        })
    }
 
    // 菜单渲染
    renderMenu = (data) => {
        return data.map( item => {
            if( item.title === "首页" ) {
                return <Menu.Item key={item.key}>
                        <NavLink to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </NavLink>
                </Menu.Item>;
            }
            if( item.children ) {
                return (
                    <SubMenu title={<span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
        })
    }

    render() {
        return (
            <div style={{height: "100%", width: this.props.collapsedBol? "80px": "200px"}}>
                <div className="siderContainer__head">
                    {/* <p className="siderContainer__title">{ this.state.adminName }</p> */}
                </div>
                <Menu
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.props.collapsedBol}
                    >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}

export default Sider;