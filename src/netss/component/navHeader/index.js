import React from 'react';
import { Dropdown, Menu, Layout, Icon } from 'antd';
import styles from 'NETSS_STYLES/index.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';
import PropTypes from 'prop-types';

const { Header } = Layout;
const { Item: MenuItem, Divider: MenuDivider } = Menu;

const NavHeader = ({ collapsed, handleCollapse, handleUserCenter, handleResetPwd, handleLogout, NickName }) => (
    <Header className={styles.header}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} className={styles['switch-icon']} onClick={handleCollapse} />
        <Dropdown
            className={styles.userinfo}
            overlay={
                <Menu>
                    <MenuItem key="1" onClick={handleUserCenter}><Icon type='user' /> 个人中心</MenuItem>
                    <MenuItem key="2" onClick={handleResetPwd}><Icon type='setting' /> 重置密码</MenuItem>
                    <MenuDivider />
                    <MenuItem key="3" onClick={handleLogout}><Icon type='logout' /> 退出登录</MenuItem>
                </Menu>
            }>
            <div>
                <img src={logoImg} />
                <a href="#">{NickName}</a>
            </div>
        </Dropdown>
    </Header>
);

NavHeader.propTypes = {
    collapsed: PropTypes.bool,
    handleCollapse: PropTypes.func,
    handleUserCenter: PropTypes.func,
    handleResetPwd: PropTypes.func,
    handleLogout: PropTypes.func,
    NickName: PropTypes.string
};

export default NavHeader;
