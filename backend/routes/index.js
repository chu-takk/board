var express = require('express');
var router = express.Router();
const { sequelize } = require('../model'); // sequelize 인스턴스를 임포트

router.post("/board/write", async function (req, res) {
  try {
    var board = req.body;
    var createdBoard = await sequelize.models.board.create(board);
    res.json(createdBoard);
  } catch (error) {
    console.error('Error writing board:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/board/:no", async function (req, res) {
  try {
    var no = req.params.no;
    var board = await sequelize.models.board.findByPk(no);
    if (board) {
      board.viewCount++;
      await board.save();
      res.json(board);
    } else {
      res.status(404).send('Board not found');
    }
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/board/list", async function (req, res) {
  try {
    console.log(req.session);
    var page = req.body.page || 1;
    var offset = (page - 1) * 10;
    var boardList = await sequelize.models.board.findAll({
      limit: 10,
      offset: offset,
      order: [["writeDate", "DESC"], ["no", "DESC"]]
    });
    var totalCount = await sequelize.models.board.count();
    console.log(totalCount);
    var totalPage = Math.ceil(totalCount / 10);
    console.log(totalPage);

    res.json({
      boardList: boardList,
      totalPage: totalPage
    });
  } catch (error) {
    console.error('Error listing boards:', error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/board/:no", async function (req, res) {
  try {
    var no = req.params.no;
    await sequelize.models.board.destroy({
      where: {
        no: no
      }
    });
    res.json({
      result: "success"
    });
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/board/modify", async function (req, res) {
  try {
    console.log(req.body);
    await sequelize.models.board.update({
      title: req.body.title,
      content: req.body.content,
      writer: req.body.writer,
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }, {
      where: {
        no: req.body.no
      }
    });
    res.json({
      result: "success"
    });
  } catch (error) {
    console.error('Error modifying board:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
