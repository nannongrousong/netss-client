import React, { Component, Fragment } from 'react';
import { Tabs, Dropdown, Icon, Menu } from 'antd';
import Exception from 'ADMIN_COMPONENT_EXCEPTION';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
const { Item: MenuItem } = Menu;

class NavTab extends Component {
    render() {
        const { handleTabsEdit, handleTabClick, handleTabsChange, children, navTab, activeRoute } = this.props;
        const tabOperMenus = (operTabKey) => (
            <Menu>
                <MenuItem key="1" onClick={handleTabsEdit.bind(this, operTabKey, 'remove')}>关闭当前</MenuItem>
                <MenuItem key="2" onClick={handleTabsEdit.bind(this, operTabKey, 'removeOther')}>关闭其他</MenuItem>
                <MenuItem key="3" onClick={handleTabsEdit.bind(this, 'allKey', 'removeAll')}>关闭所有</MenuItem>
            </Menu>
        );


        console.log('children', children);
        console.log('navTab', navTab);
        console.log('activeRoute', activeRoute);

        return (
            activeRoute == '/404'
            ? <Exception type='404' homePath='/admin/index' />
            : <Tabs
                hideAdd
                activeKey={activeRoute}
                onTabClick={handleTabClick}
                tabBarExtraContent={
                    <Dropdown overlay={tabOperMenus(activeRoute)}>
                        <a href="#">操作<Icon type="down" /></a>
                    </Dropdown>
                }
                onEdit={handleTabsEdit}
                onChange={handleTabsChange}
                type='editable-card'>
                {
                    navTab.map((tab) => (
                        <TabPane tab={
                            <Dropdown overlay={tabOperMenus(tab.path)} trigger={['contextMenu']}>
                                <div style={{ userSelect: 'none', display: 'inline-block' }}>{tab.title}</div>
                            </Dropdown>
                        } key={tab.path} closable>
                            {tab.path == activeRoute && <Fragment><p>当前tab页信息{JSON.stringify(tab)}</p><div>{children}</div></Fragment>}
                        </TabPane>
                    ))
                }
            </Tabs>
        );
    }
}

NavTab.propTypes = {
    handleTabsEdit: PropTypes.func,
    handleTabClick: PropTypes.func,
    handleTabsChange: PropTypes.func,
    children: PropTypes.node,
    navTab: PropTypes.array,
    activeRoute: PropTypes.string
};

export default NavTab;
