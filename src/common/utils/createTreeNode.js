//  生成显示菜单。一维数组->递归
export default (nodeData) => {
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