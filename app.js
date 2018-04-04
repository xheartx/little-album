/*
 * @Author: X_Heart 
 * @Date: 2017-05-23 15:53:12 
 * @Last Modified by: wangxiaoxin
 * @Last Modified time: 2018-04-04 10:29:33
 * @description: 小相册 
 */
'use strict'
const express = require('express')
const ejs = require('ejs')
const app = express()
// 路由
const router = require('./controller/router')
// 设置模板引擎
app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.set('port', (process.env.PORT || 5000));
// app.set('view engine', 'ejs')
// 静态文件中间件
app.use(express.static('./public'))
app.use(express.static('./uploads'))
// 解决favicon.ico请求问题
app.use((req, res, next) => {
  if(req.url == "/favicon.ico") {
    res.end()
  } else {
    next()
  }
})
// 根目录
app.get('/', router.showIndex)
// 相册名称
app.get('/:albumName',router.showAlbum)
// 上传
app.get('/up',router.showUp)
// 上传文件
app.post('/up',router.doPost)
// 404
app.use((req, res) => {
  res.render('err')
})
// 监听端口
app.listen(app.get('port'), function() {
  console.log('LittleAlbum is running on port', app.get('port'));
});