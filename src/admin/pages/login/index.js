import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from 'ADMIN_STYLES/login.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';
import { loginSys } from 'ADMIN_ACTION/authInfo';

const FormItem = Form.Item;

class Login extends Component {
    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            const { loginSys } = this.props;
            loginSys(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={`${styles.wrapper} w-100 h-100`}>
                <img src={logoImg} className={styles['login-img']}></img>
                <h1 className='mt-16 mb-16'>网盘系统</h1>
                <Form className={styles.form} onSubmit={this.handleLogin}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input size='large' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input size='large' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type='primary' htmlType='submit' className='w-100'>登录</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    form: PropTypes.object,
    loginSys: PropTypes.func
};

Login = Form.create()(Login);

Login = connect(
    (state) => ({

    }),
    {
        loginSys
    }
)(Login);

export default Login;