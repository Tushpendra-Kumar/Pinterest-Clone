var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local');
const upload = require('./multer');

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/register', function(req, res, next) {
  res.render("register");
});

router.get('/profile',  function(req, res, next) {
  res.render("profile");
});

router.get('/show/post',  function(req, res, next) {
  res.render("show");
});

router.get('/add',  function(req, res, next) {
  res.render("add");
});

router.post('/createpost',  function(req, res, next) {
  res.render("add");
});

router.post('/fileupload', isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  user.profileImage = req.file.fieldname;
  user.save.save();
  res.redirect("/profile");
});


router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
  })

  userModel.register(data, req.body.password)
  .then(function(){
    password.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  })
});

router.post('/login', passport.authenticate("local",{
  failureRedirect: "/",
  successRedirect: "/profile",
}), function(req, res, next) {

});

router.get("/logout", function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}


module.exports = router;
