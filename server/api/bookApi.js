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
router.post('/addBook', (req, res) => {
    var sql = $sql.book.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.bookId, params.bookName,params.author, params.publisher,params.price, params.keyword,params.supplier, params.inventory, params.url], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});
//查询所有书籍列表
router.get('/bookList', (req, res) => {
  var sql = $sql.book.select_all;
  conn.query(sql, function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});
// 更新书籍信息
router.post('/updateBook', (req, res) => {
  var sql = $sql.book.updateBook;
  var params = req.body;
  console.log('更新')
  console.log(params);
  conn.query(sql, [params.bookId,params.author, params.publisher,params.price, params.keyword,params.supplier, params.inventory,params.url, params.bookName], function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});
router.post('/deleteBook', (req, res) => {
  var sql = $sql.book.deleteBook;
  var params = req.body;
  console.log(params);
  conn.query(sql, params.bookName, function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});

router.post('/bookSearch', (req, res) => {
  var sqlByFactor = $sql.book.searchByFactor;

  var params = req.body;
  console.log(params);
  conn.query(sqlByFactor, [params.factor,params.factor,params.factor,params.factor,params.factor],function(err, result) {
    if (err) {
        console.log(err);
    }
    if (result) {
        jsonWrite(res, result);
    }
})
});
module.exports = router;
