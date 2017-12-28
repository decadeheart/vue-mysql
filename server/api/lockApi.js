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

router.post('/addLock',(req,res)=>{
  var sql = $sql.lockbooks.addLock;
  var sql_select = $sql.lockbooks.select_Lock
  var params=req.body;
  console.log(params)
  conn.query(sql_select,params.bookName,function(err, result){
    if(err){
      console.log(err)
    }
    if(result[0]===undefined){
      conn.query(sql,[params.bookId,params.bookName,params.publisher,params.supplier,params.inventory],function(err,result){
        if(err){
          console.log(err)
        }
        if(result){
          jsonWrite(res, result);
        }
      })
    }else{
      res.send('-1')
    }
  })

});

//查询所有书籍列表
router.get('/lockBookList', (req, res) => {
  var sql = $sql.lockbooks.select_books;
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
