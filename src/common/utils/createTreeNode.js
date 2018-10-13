/**
 * 将一维的菜单数组递归转化为树形节点
 * @param {菜单数组} nodeData 
 */
const createTreeNode = (nodeData) => {
    const getNodesByParent = (parentID) => (nodeData.filter(node => node.ParentID == parentID));
    const rootNodeID = 0;

    let treeNodes = [...getNodesByParent(rootNodeID)];

    const createNodes = (treeNodes) => {
        for (let i in treeNodes) {
            let childNodes = getNodesByParent(treeNodes[i].MenuID);
            if (childNodes.length) {
                treeNodes[i].Children = childNodes;
                createNodes(treeNodes[i].Children);
            }
        }
    };

    createNodes(treeNodes);
    return treeNodes;
};

export default  createTreeNode;