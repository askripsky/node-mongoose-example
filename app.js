var mongoose = require('mongoose');
var User = require('./lib/user.js');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    var joe = new User({ firstName: 'Joe', lastName: 'Smith', email: 'joe@yahoo.com', sex: 'M' });

    joe.save(function(err, joe){
        if (err)  return console.log('save error: ' + err);

        console.log('Joe saved: ' + joe);

        findJoe(deleteJoe);
    });
});

var findJoe = function(cb) {
    User.find({ firstName: 'Joe'}, function (err, users) {
        if (err) return console.error(err);

        console.log('Joe count: ' + users.length);
        console.log('Joe\'s full name: ' + users[0].fullName);

        cb();
    });
};

var deleteJoe = function() {
    User.remove({ firstName: 'Joe' }, function(){
        console.log('Joe is gone');

        db.close();
    });
};