import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send('hello world')l
  res.render('web/index');
  // res.json({index:'setup exvironment test'})
});

export default router;
