var router = require('express').Router();
var Voting = require('./data/Voting');
var User = require('./data/User');
var bcrypt = require('bcrypt');
var exec = require('child_process').exec;

router.post('/join', function (req, res) {
    if(!req.body.pin)
        return res.status(400).send();
    Voting.find({pin: req.body.pin}, function(err, result){
        if(err)
            return res.status(500).send();
        else if(result.length == 0)
            return res.status(400).send();
        req.session.pin = req.body.pin;
        req.session.save();
        return res.status(200).send();
    });
});

router.get('/votings', function(req, res){
    if(!req.session.user)
        return res.status(403).send();
    Voting.find({author: req.session.user}, function(err, result){
        if(err)
            return res.status(500).send();
        res.status(200).json(result);
    });
});

router.post('/login', function(req, res){
    if(!req.body.username || !req.body.password)
        return res.status(400).send();
    User.find({username: req.body.username}, function(err, result){
        if(err)
            return res.status(500).send();
        if(result.length != 1)
            return res.status(400).send();
        bcrypt.compare(req.body.password, result[0].password, function(err, check){
            if(err)
                return res.status(500).send();
            if(!check)
                return res.status(400).send();
            console.log(result);
            req.session.user = result[0]._id;
            req.session.save();
            res.status(200).send();
        });
    });
});

router.post('/payload', function(req, res){
    exec('git -C /home/pi/Vote-for-me reset --hard', execCB);
    exec('git -C /home/pi/Vote-for-me clean -df', execCB);
    exec('git -C /home/pi/Vote-for-me pull -f', execCB);
    exec('npm -C /home/pi/Vote-for-me install', execCB);
    process.exit(0);
});

module.exports = router;