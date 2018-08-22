module.exports = {
    'GET /api/SERVICE_A/GET_DATA': {
        age: 12,
        name: 'zhangsan'
    },
    'POST /api/SERVICE_A/POST_DATA': (req, res) => {
        res.send({
            Code: 0,
            Desc: '成功',
            Data: '服务AOK!'
        })
    }
};