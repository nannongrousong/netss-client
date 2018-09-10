import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Item: MenuItem, SubMenu } = Menu;

const createMenus = (menus) => {
    //  有children忽略path参数
    return menus.map((item) => {
        const { key, title, icon, children } = item;
        if (children) {
            return (
                <SubMenu
                    key={key}
                    title={<span><Icon type='user' /><span>{title}</span></span>}>
                    {createMenus(children)}
                </SubMenu>
            );
        } else {
            return (
                <MenuItem key={key} >
                    <Icon type={icon} />
                    <span className='nav-text'>{title}</span>
                </MenuItem>
            );
        }
    });
};

const NavMenu = ({ menus, handleMenuClick, activeRoute }) => (
    <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[activeRoute]}
        onClick={handleMenuClick}>
        {createMenus(menus)}
    </Menu>
);

NavMenu.propTypes = {
    menus: PropTypes.array,
    handleMenuClick: PropTypes.func,
    activeRoute: PropTypes.string
};

export default NavMenu;