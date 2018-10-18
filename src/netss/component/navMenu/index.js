import React from 'react';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

const { Item: MenuItem, SubMenu } = Menu;

const renderIcon = (icon) => {
    if(/\.(png|jpe?g|gif|svg)$/.test(icon)) {
        //  图片
        return <img style={{display: 'inline-block', height: '16px', width: '16px', marginRight: '10px'}} src={icon} />;
    } else {
        //  图标
        return <Icon type={icon} />;
    }
};

const createMenus = (menus) => {
    //  有children忽略path参数
    return menus.map((item) => {
        const { MenuID, Title, Icon: IconV, Children, Path, Type } = item;
        if (Children) {
            //  SubMenu无path， key使用item.key
            return (
                <SubMenu
                    key={MenuID}
                    title={<span>{renderIcon(IconV)}<span>{Title}</span></span>}>
                    {createMenus(Children)}
                </SubMenu>
            );
        } else if (Type == 'node') {
            //  MenuItem一定有path且唯一，key使用item.path，避免查找工作
            return (
                <MenuItem key={Path} >
                    {renderIcon(IconV)}
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