import React, { Component } from 'react';
import { Tabs, Dropdown, Icon, Menu } from 'antd';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
const { Item: MenuItem } = Menu;

class NavTab extends Component {
    render() {
        const { handleTabClose, handleTabsEdit, handleTabClick, handleTabsChange, children, navTab, activeRoute } = this.props;
        const tabOperMenus = (
            <Menu>
                <MenuItem key="1" onClick={handleTabClose.bind(this, 'present')}>关闭当前</MenuItem>
                <MenuItem key="2" onClick={handleTabClose.bind(this, 'other')}>关闭其他</MenuItem>
                <MenuItem key="3" onClick={handleTabClose.bind(this, 'all')}>关闭所有</MenuItem>
            </Menu>
        );

        return (
            <Tabs
                hideAdd
                activeKey={activeRoute}
                onTabClick={handleTabClick}
                tabBarExtraContent={
                    <Dropdown overlay={tabOperMenus}>
                        <a href="#">操作<Icon type="down" /></a>
                    </Dropdown>
                }
                onEdit={handleTabsEdit}
                onChange={handleTabsChange}
                type='editable-card'>
                {
                    navTab.map((tab) => (
                        <TabPane tab={tab.title} key={tab.key} closable>
                            <p>{JSON.stringify(tab)}</p>
                            {children}
                        </TabPane>
                    ))
                }
            </Tabs>
        );
    }
}

NavTab.propTypes = {
    handleTabClose: PropTypes.func,
    handleTabsEdit: PropTypes.func,
    handleTabClick: PropTypes.func,
    handleTabsChange: PropTypes.func,
    children: PropTypes.node,
    navTab: PropTypes.array,
    activeRoute: PropTypes.string
};

export default NavTab;
