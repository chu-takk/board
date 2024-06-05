var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/join", async function (req, res) {
  var checkUser = await sequelize.models.user.findOne({
    where: {
      id: req.body.id
    }
  })
  if (checkUser) {    //이미 가입된 아이디가 있으면
    res.json({
      result: "fail",
      message: "이미 가입된 아이디입니다."
    })
    return
  }
  await sequelize.models.user.create(req.body)
  res.json({
    result: "success"
  })
})

router.post("/login", async function (req, res) {
  var checkUser = await sequelize.models.user.findOne({
    where: {
      id: req.body.id,
      password: req.body.password
    }
  })
  if (!checkUser) { //로그인 실패 -> 아이디 또는 패스워드가 틀림
    res.json({
      result: "fail",
      message: "아이디 또는 패스워드가 틀렸습니다."
    })
    return
  }
  //TODO : 세션에 로그인 정보 저장
  req.session.user = checkUser

  res.json({
    result: "success",
    user: checkUser
  })

})

router.post("/info", async function (req, res) {
  if (req.session.user) { //세션에 사용자정보가 있을때 -> 로그인 상태
    res.json({
      result: "success",
      user: req.session.user
    })
  }
  else { //세션에 사용자정보가 없을때 -> 로그아웃 상태
    res.json({
      result: "fail"
    })
  }
})
router.post("/logout", async function (req, res) {
  req.session.destroy()
  res.json({
    result: "success"
  })
})




module.exports = router;
