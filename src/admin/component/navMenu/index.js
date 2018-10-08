import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Item: MenuItem, SubMenu } = Menu;

const createMenus = (menus) => {
    //  有children忽略path参数
    return menus.map((item) => {
        const { MenuID, Title, Icon: IconV, Children, Path, Type } = item;
        if (Children) {
            //  SubMenu无path， key使用item.key
            return (
                <SubMenu
                    key={MenuID}
                    title={<span><Icon type={IconV} /><span>{Title}</span></span>}>
                    {createMenus(Children)}
                </SubMenu>
            );
        } else if (Type == 'node') {
            //  MenuItem一定有path且唯一，key使用item.path，避免查找工作
            return (
                <MenuItem key={Path} >
                    <Icon type={IconV} />
                    <span className='nav-text'>{Title}</span>
                </MenuItem>
            );
        } else {
            return null;
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