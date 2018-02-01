var router = require('express').Router();

router.use('/api', require('./api'));

router.get('/voting', function (req, res) {
    if (!req.session.pin) {
        res.redirect(307, '/').end();
        return res.end();
    }
    res.render('voting');
});

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/admin', function(req, res){
    if(!req.session.user) {
        res.redirect(307, '/login');
        return res.end();
    }
    res.render('admin');
});

router.get('/', function (req, res) {
    res.render('lobby');
});

module.exports = router;