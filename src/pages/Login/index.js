import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { LoginApi } from "../../api/getData"


class Login extends Component {

    /**
     * 登录
     *  
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let reqData = {
                    username: values.username,
                    password: values.password
                }
                LoginApi(reqData).then( res => {
                    console.log("res", res)
                    debugger;
                    if( res.code === "1" ) {
                        localStorage.setItem("tokwn", res.data.token);
                        this.props.history.push("/admin/dashboard");
                    } 
                })
            }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{width: "500px"}}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登 录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;