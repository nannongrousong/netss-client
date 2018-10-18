import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import styles from 'NETSS_STYLES/index.less';
import logoImg from 'COMMON_IMAGES/logo.jpg';
import NavMenu from 'NETSS_COMPONENT/navMenu';

const { Sider } = Layout;

const NavSlider = ({ collapsed, navMenu, handleMenuClick, handleCollapse, activeRoute }) => (
    <Sider
        collapsed={collapsed}
        onCollapse={handleCollapse}
        collapsible>
        {
            <div className={styles.logo}>
                <img src={logoImg} />
                <span className={collapsed ? 'd-none' : ''}>周薪薪</span>
            </div>
        }

        <NavMenu
            menus={navMenu}
            handleMenuClick={handleMenuClick}
            activeRoute={activeRoute} />
    </Sider>
);

NavSlider.propTypes = {
    collapsed: PropTypes.bool,
    navMenu: PropTypes.array,
    handleCollapse: PropTypes.func,
    handleMenuClick: PropTypes.func,
    activeRoute: PropTypes.string
};

export default NavSlider;