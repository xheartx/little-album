/*
 * @Author: X_Heart 
 * @Date: 2017-05-23 16:05:42 
 * @Last Modified by: wangxiaoxin
 * @Last Modified time: 2018-04-04 10:40:51
 * @description: 路由
 */
'use strict'
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const sd = require('silly-datetime');
const file = require('../models/file')

// 首页
exports.showIndex = (req,res,next) => {
    file.getAllAlbums((err, allAlbums) => {
        if (err) {
            next()
            return
        }
        res.render('index', {
            "albums": allAlbums
        })
    })
}
// 相册页
exports.showAlbum = (req,res,next) => {
    // 遍历相册所有图片
    let albumName = req.params.albumName
    file.getAllImagesByAlnumName(albumName, (err, imagesArray) => {
        if (err) {
            next()
            return
        }
        res.render('album', {
            "albumname": albumName,
            'images': imagesArray
        })
    })
}
// 上传页
exports.showUp = (req, res, next) => {
    file.getAllAlbums((err, allAlbums) => {
        if (err) {
            next()
            return
        }
        res.render('up', {
            "albums": allAlbums
        })
    })
}
// 上传文件
exports.doPost = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../tempup/")
    form.parse(req, function(err, fields, files) {
        // console.log(fields)
        // console.log(files)
        if (err) {
            next()
            return
        }
        // 改名
        let size = parseInt(files.img_file.size)
        if (size > 2*1024*1024) {
            res.send('图片上传不能超过2M')
            fs.unlink(files.img_file.path)
            return
        }

        let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
        let ran = parseInt(Math.random() * 89999 + 10000)
        let extname = path.extname(files.img_file.name)

        let albums = fields.albums
        let oldpath = files.img_file.path
        let newpath = path.join(__dirname, "../uploads/", albums, ttt + ran + extname)
        fs.rename(oldpath, newpath, (err) => {
            if (err) {
                res.send('改名失败')
                return
            }
            // res.send('成功')
            res.redirect('/'+fields.albums)
        })
    });
}