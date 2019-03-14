var express = require('express');
var router = express.Router();
var JobDetailModel = require('./db/config').JobDetailModel;
/* GET home page. */
router.get('/', function(req, res, next) {
  JobDetailModel.find({},(err,docs)=>{
  	if (err) { return console.log(err)}
  	var n=0,job_undo=0,job_running=0,job=0,job_archive=0;//统计
  	docs.forEach(item=>{
       n++
       if (item.job_status=="未开始...") {
       	  job_undo++
       }else if (item.job_status=="进行中...") {
       	console.log('running')
       	  job_running++
       }else{
       	job_archive++;
       }
      
  	})	
  	res.render('query', { title: 'Benchmark 业务',docs,n,job_undo, job_running,job_archive});	
  })	
});

module.exports = router;
