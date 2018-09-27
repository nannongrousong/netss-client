import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Item: MenuItem, SubMenu } = Menu;

const createMenus = (menus) => {
    //  有children忽略path参数
    return menus.map((item) => {
        const { menu_id, title, icon, children, path } = item;
        if (children) {
            //  SubMenu无path， key使用item.key
            return (
                <SubMenu
                    key={menu_id}
                    title={<span><Icon type={icon} /><span>{title}</span></span>}>
                    {createMenus(children)}
                </SubMenu>
            );
        } else {
            //  MenuItem一定有path且唯一，key使用item.path，避免查找工作
            return (
                <MenuItem key={path} >
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