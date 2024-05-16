var express = require('express');
var router = express.Router();

router.post("/board/write", async function (req, res) {
  var board = req.body
  console.log(req.session.user.id)
  board.writerId = req.session.user.no
  var createdBoard = await sequelize.models.board.create(board)
  /*var user=await sequelize.models.user.findOne({
    where: {
      id:req.session.user.id
    }
  })
  await createdBoard.setWriterUser(user)
  */
  res.json(createdBoard)

})
router.get("/board/:no", async function (req, res) {
  var no = req.params.no
  var board = await sequelize.models.board.findByPk(no)
  board.viewCount++
  await board.save()
  res.json(board)
})
router.post("/board/list", async function(req,res){
  console.log(req.session)
  var page = req.body.page || 1
  var page = req.body.page
  var offset = (page -1)*10

  var boardList = await  sequelize.models.board.findAll({
    include:{
      model:sequelize.models.user,
      as: "writerUser",
      required: true
    },

    limit : 10,
    offset : offset,
    order: [["writeDate", "DESC"],["no", "DESC"]]
  })
  var totalCount = await sequelize.models.board.count({
    include: {
      model: sequelize.models.user,
      as: "writerUser",
      required:true
    },
  })
  console.log(totalCount)
  var totalPage=Math.ceil(totalCount/10)
  console.log(totalPage)

  res.json({
    boardList: boardList,
    totalPage: totalPage
  })
})


router.delete("/board/:no",async function(req,res){
  var no=req.params.no
  await sequelize.models.board.destroy({
    where:{
      no: no
    }
  })
  res.json({
    result: "success"
  })
})
router.post("/board/modify", async function (req, res){
  console.log(req.body)
  await sequelize.models.board.update({
    title: req.body.title,
    content: req.body.content,
    writer: req.body.writer
  }, {
    where: {
      no: req.body.no
    }
  })
  res.json({
    result:"success"
  })
})

module.exports = router;
