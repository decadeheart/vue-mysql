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

router.post('/addOrder',(req,res)=>{
  var sql = $sql.order.add_order;
  var book_sql=$sql.book.update_inventory;
  var params=req.body;
  console.log(params)
      conn.query(sql,[params.orderId,params.userId,params.bookName,params.orderNum,params.money,params.address,params.situation],function(err,result){
        if(err){
          console.log(err)
        }
        if(result){
          conn.query(book_sql,[params.inventory,params.bookName],function(err,result){
            if(result){
              jsonWrite(res, result);
            }
            if(err){
              console.log(err)
            }
          })
        }
      })
});
//查询所有用户列表
router.get('/orderList', (req, res) => {
  var sql = $sql.order.select_orders;
  conn.query(sql, function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});
//改变订单状态
router.post('/changeStatus', (req, res) => {
  var sql = $sql.order.changeStatus;
  var params=req.body;
  console.log(params)
  conn.query(sql,params.orderId, function(err, result) {
      if (err) {
          console.log(err);
      }
      if (result) {
          jsonWrite(res, result);
      }
  })
});
//搜索订单
router.post('/searchOrder', (req, res) => {
  var sqlByFactor = $sql.order.searchByFactor;

  var params = req.body;
  console.log(params);
  conn.query(sqlByFactor, [params.factor,params.factor,params.factor,params.factor],function(err, result) {
    if (err) {
        console.log(err);
    }
    if (result) {
        jsonWrite(res, result);
    }
})
});
module.exports = router;
