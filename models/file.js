/*
 * @Author: X_Heart 
 * @Date: 2017-05-23 17:16:09 
 * @Last Modified by: X_Heart
 * @Last Modified time: 2017-05-24 11:20:38
 */
const fs = require('fs')
const path = require('path')
// 获取所有文件夹
exports.getAllAlbums = (callback) => {
    fs.readdir(path.join(__dirname, '../uploads'), (err, files) => {
        if (err) {
            callback('没有找到uploads文件夹', null)
            return
        }
        let allAlbums = [];
        (function iterator(i) {
            if (i == files.length) {
                // 遍历结束
                callback(null, allAlbums)
                return
            }
            fs.stat(path.join(__dirname, '../uploads', files[i]), (err, stats) => {
                if (err) {
                    callback('找不到文件' + files[i] , null)
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i])
                }
                iterator(i + 1)
            })
        })(0)
    })
}
// 通过文件名得到所有图片
exports.getAllImagesByAlnumName = (albumName, callback) => {
     fs.readdir(path.join(__dirname, '../uploads', albumName), (err, files) => {
        if (err) {
            callback(`没有找到${albumName}文件夹`, null)
            return
        }
        let allImages = [];
        (function iterator(i) {
            if (i == files.length) {
                // 遍历结束
                callback(null, allImages)
                return
            }
            fs.stat(path.join(__dirname, '../uploads', albumName, files[i]), (err, stats) => {
                if (err) {
                    callback('找不到文件' + files[i] , null)
                    return
                }
                if (stats.isFile()) {
                    allImages.push(files[i])
                }
                iterator(i + 1)
            })
        })(0)
    })
}