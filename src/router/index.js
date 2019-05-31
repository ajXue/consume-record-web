import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';  
import App from "../App"
import Login from "../pages/Login"
import Layout from '../pages/Layout'
import Dashboard from '../pages/Dashboard'
import phonelist from '../pages/taskCenter/phonelist'
import UserManage from '../pages/SystemManage/UserManage'
import NoMatch from '../pages/noMatch'

class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}></Route>    
                    <Route path="/admin" render={ () => 
                         <Layout>
                             <Switch>
                                <Route path="/admin/dashboard" component={Dashboard}></Route>
                                <Route path="/admin/taskCenter/phonelist" component={phonelist}></Route>
                                <Route path="/admin/system/userManage" component={UserManage}></Route>
                                <Route component={NoMatch}></Route>
                             </Switch>
                        </Layout>
                    }></Route>    
                </App> 
            </HashRouter>
        );
    }
}

export default Router;