import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CMS_Login } from 'ADMIN_SERVICE/Sys_Auth';
import { errorHandle } from 'COMMON_UTILS/common';

import styles from 'ADMIN_STYLES/login.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: !!sessionStorage.getItem('AUTH_INFO')
        };
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                return;
            }

            try {
                let resData = await CMS_Login(values);
                const { Code, Data: { token }, Info } = resData;
                if (!Code) {
                    errorHandle(Info);
                } else {
                    //  save userinfo into localstorage
                    sessionStorage.setItem('AUTH_INFO', token);
                    this.setState({
                        isLogin: !!sessionStorage.getItem('AUTH_INFO')
                    });
                }
            } catch (err) {
                errorHandle(err);
            }
        });
    }

    render() {
        const {
            form: { getFieldDecorator },
            history: { location: { state } }
        } = this.props;
        const { isLogin } = this.state;
        let from = state && state.from;

        return (
            !isLogin
                ? <div className={`${styles.wrapper} w-100 h-100`}>
                    <img src={logoImg} className={styles['login-img']}></img>
                    <h1 className='mt-16 mb-16'>网盘系统</h1>
                    <Form className={styles.form} onSubmit={this.handleLogin}>
                        <FormItem>
                            {getFieldDecorator('loginName', {
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
                : <Redirect to={from || '/index'}></Redirect>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object,
    form: PropTypes.object
};

Login = Form.create()(Login);

export default Login;