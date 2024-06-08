var express = require('express');
var router = express.Router();
const { User } = require('../model');

// 회원 가입 라우트
router.post("/join", async function (req, res) {
  try {
    const { id, password, name, grade } = req.body;
    var checkUser = await User.findOne({
      where: {
        id: id
      }
    });
    if (checkUser) {
      res.json({
        result: "fail",
        message: "이미 가입된 아이디입니다."
      });
      return;
    }
    await User.create({ id, password, name, grade });
    res.json({
      result: "success"
    });
  } catch (error) {
    console.error('Error during join:', error);
    res.status(500).json({ error: error.message });
  }
});

// 로그인 라우트
router.post('/login', async function (req, res) {
  try {
    const { id, password } = req.body;
    var checkUser = await User.findOne({
      where: {
        id: id,
        password: password
      }
    });
    if (!checkUser) {
      res.json({
        result: 'fail',
        message: '아이디 또는 패스워드가 틀렸습니다.'
      });
      return;
    }
    req.session.user = checkUser;
    res.json({
      result: 'success',
      user: checkUser
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: error.message });
  }
});

// 로그아웃 라우트
router.post('/logout', function (req, res) {
  req.session.destroy();
  res.json({ result: 'success' });
});

// 사용자 정보 라우트
router.post('/info', function (req, res) {
  if (req.session.user) {
    res.json({
      result: 'success',
      user: req.session.user
    });
  } else {
    res.json({
      result: 'fail'
    });
  }
});

module.exports = router;
