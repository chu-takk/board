var express = require('express');
const { Sequelize } = require('sequelize');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/join",async function(req,res){
  var checkUser = await sequelize.models.user.findOne({
    where: {
      id: req.body.id
    }
  })
  if(checkUser){
    res.json({
      result:"fail",
      message:"이미 가입된 아이디입니다"
    })
    return
  }
  await sequelize.models.user.create(req.body)
  res.json({
    result:"success"
  })
})

router.post("/login", async function (req, res){
  var checkUser = await sequelize.models.user.findOne({
    where: {
      id: req.body.id,
      password: req.body.password

    }
  })
  if(!checkUser){
    res.json({
      result: "fail",
      message: "아이디 또는 패스워드가 틀림"
    })
    return

  }

  req.session.user = checkUser

  res.json({
    result: "success",
    user: checkUser
  })
})

router.post("/info", async function (req, res) {
  if (req.session.user) {
    res.json({
      result: "success",
      user: req.session.user
    })

  }

  else {
    res.json({
      result:"fail"
    })
  }
})
router.post("/logout", async function(req,res){
  req.session.destroy()
  res.json({
    result: "success"
  })
})


module.exports = router;
