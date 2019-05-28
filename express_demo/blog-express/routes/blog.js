const express = require('express')
const router = express.Router()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', (req, res, next) => {
  const keyword = req.query.keyword
  const author = req.query.author
  const result = getList(keyword, author)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  }) 
})

router.get('/detail', (req, res, next) => {
  const id = req.query.id
  const result = getDetail(id)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

module.exports = router