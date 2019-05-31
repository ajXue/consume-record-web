import React, { Component } from 'react';
import { Table, Card, Button, Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

export default class UserManage extends Component {
    render() {
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
            </div>
        );
    }
}

class FilterForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="全部" style={{width: "80px"}}>
                                <Option value="">全部</Option>  
                                <Option value="1">1</Option>  
                                <Option value="2">2</Option>  
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="城市2">
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="全部2" style={{width: "120px"}}>
                                <Option value="">全部2</Option>  
                                <Option value="1">12</Option>  
                                <Option value="2">22</Option>  
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);