import { Button, Form, Input, message, Modal } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '../utils';

class Login extends React.Component {
    state = {
        displayModal: false//初显示：false，点击后显示
    }

    handleCancel = () => {
        //displayModel =>true
        this.setState({
            displayModal: false,
        })
    }

    signinOnClick = () => {
        //displayModel =>true
        this.setState({
            displayModal: true,
        })
    }
    onFinish = (data) => {
        //1.collect username / password from the form
        //2.send data to the server
        login(data)
            .then((data) => {
                //choose the model
                this.setState({
                    displayModal: false,
                    //inform app the status of login
                })
                message.success(`Welcome back, ${data.name}`);
                this.props.onSuccess();
            }).catch((err) => {
            message.error(err.message);
        })
    }
    render = () => {
        return (
            //                                                           两个组件之间margin
            <div>
                <Button shape="round" onClick={this.signinOnClick} style={{ marginRight: '20px' }}>
                    Login</Button>
                <Modal
                    title="Log in"
                    visible={this.state.displayModal}//state rerender
                    onCancel={this.handleCancel}//点击区域外自动关掉弹窗
                    footer={null}//没有 footer
                    destroyOnClose={true}
                >
                    <Form
                        //prederve keep field value
                        name="normal_login"
                        onFinish={this.onFinish}
                        preserve={false}
                    >
                        <Form.Item
                            name="user_id"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>

                            <Button type="primary" htmlType="submit">  {/*submit 和 onfinish 绑定触发*/}
                                Login</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}


export default Login;