var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 增加书籍接口
router.post('/addPublish', (req, res) => {
    var sql = $sql.publish.add_publish;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.publisherName, params.publishMessage,params.publishBooks], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//查询所有书籍列表
router.get('/publishList', (req, res) => {
  var sql = $sql.publish.select_publishers;
  conn.query(sql, function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});
module.exports = router;
