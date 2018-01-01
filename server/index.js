// node 后端服务器

const userApi = require('./api/userApi');
const bookApi = require('./api/bookApi');
const lockApi = require('./api/lockApi');
const orderApi = require('./api/orderApi');
const publishApi = require('./api/publishApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/book', bookApi);
app.use('/api/lockbooks', lockApi);
app.use('/api/order', orderApi);
app.use('/api/publish', publishApi);
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
