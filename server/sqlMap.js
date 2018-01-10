// sql语句
var sqlMap = {
  // 用户
  user: {
      add: 'insert into user(userId, password) values ( ?, ?)',
      select_name: 'SELECT * from user where userId = ?',    //查询 username
      select_password: 'SELECT * from user where password = ?',    //查询 password
      updateExtral:'update user set extral=? where userId = ?',
      updateUser:'update user set name=?,address=?,password=?  where userId = ?',
      Admin_Update:'update user set name=?,address=?,extral=?,level=?  where userId = ?',
      deleteUser: 'delete from user where userId = ?',
      select_users:'SELECT * from user',
      searchById:"select * from user where userId like CONCAT('%',?,'%')",
      searchByName:"select * from user where name like CONCAT('%',?,'%')",
      searchByAddress:"select * from user where address like CONCAT('%',?,'%')",
  },
  book:{
      add: 'insert into book(bookId, bookName, author,publisher,price,keyword,supplier,inventory,url) values (?, ?, ?, ?, ?, ?, ?, ?,?)',
      select_all: 'SELECT * from book',
      updateBook:'update book set bookId=?,author=?,publisher=?,price=?,keyword=?,supplier=?,inventory=?,url=?  where bookName = ?',
      deleteBook: 'delete from book where bookName = ?',
      update_inventory:'update book set inventory=? where bookName=?',
      searchById:"select * from book where bookId like CONCAT('%',?,'%')" ,
      searchByName:"select * from book where bookName like CONCAT('%',?,'%')",
      searchByPublish:"select * from book where publisher like CONCAT('%',?,'%')",
      searchByAuthor:"select * from book where author like CONCAT('%',?,'%')",
      searchBykey:"select * from book where keyword like CONCAT('%',?,'%')",
      searchByFactor:"select * from book where bookId like CONCAT('%',?,'%') or bookName like CONCAT('%',?,'%') or publisher like CONCAT('%',?,'%') or author like CONCAT('%',?,'%') or keyword like CONCAT('%',?,'%')"
    },
  lockbooks:{
    addLock:'INSERT INTO lockbooks(bookId,bookName,publisher,supplier,inventory,date) values (?,?,?,?,?,NOW())',
    select_books:'select * from lockbooks',
    select_Lock:'select * from lockbooks where bookName=?',
    delete_lock:'delete from lockbooks where bookName= ?',
  },
  order:{
    add_order: 'INSERT INTO orders(orderId,userId,bookName,orderNum,money,address,situation,date) values (?,?,?,?,?,?,?,NOW())',
    select_orders: 'SELECT * from orders',
    orderUpdate:'update orders set bookId=?,author=?,publisher=?,price=?,keyword=?,supplier=?,inventory=?,url=?  where bookName = ?',
    deleteorder:'delete from orders where orderId= ?',
    changeStatus:'update orders set status=1 where orderId= ?',
    searchByFactor:"select * from orders where orderId like CONCAT('%',?,'%') or userId like CONCAT('%',?,'%') or bookName like CONCAT('%',?,'%') or address like CONCAT('%',?,'%')"
  },
  publish:{
    add_publish: 'insert into publisher(publisherName, publishMessage, publishBooks) values (?, ?, ?)',
    select_publishers:'SELECT * from publisher',
  },
}

module.exports = sqlMap;
