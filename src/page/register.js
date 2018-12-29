import React from "react";
import { Form, Input, Button } from 'antd';
import { NavLink } from "react-router-dom";
import axios from 'axios';

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;
const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    Email : "",
    Password : "",
    confirmPassword : "",
  };

  componentDidMount(){
    // ipcRenderer.on('transitionToLogin', () => {
    //   this.props.history.push('/login');
    // });
  }
  handleGetEmail = (event) => {
    this.setState({
      Email : event.target.value,
    })
  };

  handleGetPassword = (event) => {
    this.setState({
      Password : event.target.value,
    })
  };

  handleGetConfirmed= (event) => {
    this.setState({
      confirmPassword : event.target.value,
    })
  };

  handleGetUsername= (event) => {
    this.setState({
      username : event.target.value,
    })
  };
 
  handleRegister = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios({
          url: 'http://35.243.234.68:8000/register',
          method: 'post',
          data: {
            email:  this.state.Email,
            username: this.state.username,
            password:  this.state.Password
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = '';
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
          this.props.history.push('/');
        })  
        .catch(error => {
          console.log(error);
        });
      }
      else{
        console.log(err.message);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

//a function check if the username is occupied
//validateStatus="validating" -->"success" ok / "error" occupied


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form id="reg-form" onSubmit={this.handleRegister} style={{ width: '40%', marginLeft: '25%',marginTop: '10%'}}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input onChange={this.handleGetEmail}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Username"
        >
         {getFieldDecorator('username', {
            rules: [{
              required: true, message: 'Please input your username!',
            }],
          })(
            <Input onChange={this.handleGetUsername}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" onChange={this.handleGetPassword}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} onChange={this.handleGetConfirmed}/>
          )}
        </FormItem>
       
        {/* <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem> */}
        <FormItem {...tailFormItemLayout}>
          <Button id="reg-btn" type="primary" htmlType="submit">Register</Button>
          <NavLink to="/"> Go back to login!</NavLink>
        </FormItem>
        
      </Form>
    );
  }
}

const Register = Form.create()(RegistrationForm);
export default Register;