import React from 'react';
import { Dropdown, Menu, Layout, Icon } from 'antd';
import styles from 'ADMIN_STYLES/index.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';
import PropTypes from 'prop-types';

const { Header } = Layout;
const { Item: MenuItem, Divider: MenuDivider } = Menu;

const operMenus = (
    <Menu>
        <MenuItem key="1" onClick={null}><Icon type='user' /> 个人中心</MenuItem>
        <MenuItem key="2" onClick={null}><Icon type='setting' /> 个人中心设置</MenuItem>
        <MenuDivider />
        <MenuItem key="3" onClick={null}><Icon type='logout' /> 退出登录</MenuItem>
    </Menu>
);

const NavHeader = ({ collapsed, handleCollapse }) => (
    <Header className={styles.header}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} className={styles['switch-icon']} onClick={handleCollapse} />
        <Dropdown overlay={operMenus} className={styles.userinfo} >
            <div>
                <img src={logoImg} />
                <a href="#">操作</a>
            </div>
        </Dropdown>
    </Header>
);

NavHeader.propTypes = {
    collapsed: PropTypes.bool,
    handleCollapse: PropTypes.func
};

export default NavHeader;
