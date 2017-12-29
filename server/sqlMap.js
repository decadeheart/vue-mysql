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
  },
  book:{
      add: 'insert into book(bookId, bookName, author,publisher,price,keyword,supplier,inventory,url) values (?, ?, ?, ?, ?, ?, ?, ?,?)',
      select_all: 'SELECT * from book',
      updateBook:'update book set bookId=?,author=?,publisher=?,price=?,keyword=?,supplier=?,inventory=?,url=?  where bookName = ?',
      deleteBook: 'delete from book where bookName = ?',
      update_inventory:'update book set inventory=? where bookName=?',
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
  }
}

module.exports = sqlMap;
