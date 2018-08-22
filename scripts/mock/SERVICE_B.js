module.exports = {
    'GET /api/SERVICE_B/GET_DATA': {
        age: 12,
        name: 'zhangsan'
    },
    'POST /api/SERVICE_B/POST_DATA': (req, res) => {
        res.send({
            Code: 0,
            Desc: '成功',
            Data: '服务BOK!'
        })
    }
};