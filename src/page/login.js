import React from "react";
import { Form, Icon, Input, Button, Checkbox, Divider} from 'antd';
import { NavLink } from "react-router-dom";
import axios from 'axios';

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    state = {
        Username: "",
        Password: "",
    };

    componentDidMount(){

    }
    handleGetUsername = (event) => {
        this.setState({
            Username : event.target.value,
        })
    };

    handleGetPassword = (event) => {
        this.setState({
            Password : event.target.value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios({
                    url: 'http://35.243.234.68:8000/login',
                    method: 'post',
                    data: {
                        email:  this.state.Username,
                        password:  this.state.Password
                    },
                    transformRequest: [function (data) {
                        // Do whatever you want to transform the data
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(response => {
                        this.props.history.push('/index');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>

                <Form id="login-form" onSubmit={this.handleSubmit} className="login-form"  style={{ width: '40%', marginLeft: '30%',marginTop: '10%'}}>
                    <h1 style={{ marginLeft: '10%'}}> Welcome to Wallpaper Workshop!</h1>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" type="text" onChange={this.handleGetUsername}/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleGetPassword}/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox style={{float:'left'}}>Remember me</Checkbox>
                        )}

                        <a className="login-form-forgot" href="" style={{float:'right'}}>Forgot password?</a>
                        <div>
                            <Button id="login-btn" onClick={this.handleSubmit} type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}} >
                                Log in
                            </Button>
                        </div>
                        Or
                        <NavLink to="/register" id="reg-link"> register now!</NavLink>

                    </FormItem>
                </Form>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;
