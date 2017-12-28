// sql语句
var sqlMap = {
  // 用户
  user: {
      add: 'insert into user(userId, password) values ( ?, ?)',
      select_name: 'SELECT * from user where userId = ?',    //查询 username
      select_password: 'SELECT * from user where password = ?',    //查询 password
      updateExtral:'update user set extral=? where userId = ?',
      updateUser:'update user set name=?,address=?,password=?  where userId = ?'
  },
  book:{
      add: 'insert into book(bookId, bookName, author,publisher,price,keyword,supplier,inventory) values (?, ?, ?, ?, ?, ?, ?, ?)',
      select_all: 'SELECT * from book',
      updateBook:'update book set bookId=?,author=?,publisher=?,price=?,keyword=?,supplier=?,inventory=?  where bookName = ?',
      deleteBook: 'delete from book where bookName = ?',
  },
  lockbooks:{
    addLock:'INSERT INTO lockbooks(bookId,bookName,publisher,supplier,inventory,date) values (?,?,?,?,?,NOW())',
    select_books:'select * from lockbooks',
  }
}

module.exports = sqlMap;
