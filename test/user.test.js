var should = require('chai').should()
    , proxyquire = require('proxyquire')
    , mongoose = require('mongoose')
    , mockgoose = require('Mockgoose');

mockgoose(mongoose);

describe('User', function(){
    var User = proxyquire('../lib/user', { 'mongoose': mongoose });

    var male1, male2, female1, female2, female3;

    beforeEach(function(done) {

        mockgoose.reset();

        male1 = new User({
            firstName: 'bart',
            lastName: 'simpson',
            sex: 'M',
            email: 'm1@yahoo.com'
        });

        male2 = new User({
            firstName: 'homer',
            lastName: 'simpson',
            sex: 'M',
            email: 'm2@yahoo.com'
        });

        female1 = new User({
            firstName: 'lisa',
            lastName: 'simpson',
            email: 'f1@yahoo.com'
        });

        female2 = new User({
            firstName: 'margaret',
            lastName: 'simpson',
            email: 'f2@yahoo.com'
        });

        female3 = new User({
            firstName: 'marge',
            lastName: 'simpson',
            email: 'f3@yahoo.com'
        });

        male1.save();
        male2.save();
        female1.save();
        female2.save();
        female3.save();

        done();
    });

    describe('find()', function(){
        it('should return records', function(done){
            User.find(function(err, users){
                should.not.exist(err);

                users.length.should.equal(5);

                done();
            });
        });
    });

    describe('getMales()', function(){
        it('should get only male Users', function(done){
            User.getMales(function(err, males){
                should.not.exist(err);

                males.length.should.equal(2);

                males[0].sex.should.equal('M');
                males[1].sex.should.equal('M');

                done();
            });
        });
    });

    describe('fullName()', function(){
        it('should get create the full name from first and last names', function(done){
            User.findOne({ firstName: 'bart'}, function(err, bart){
                should.not.exist(err);

                bart.fullName.should.equal('bart simpson');

                done();
            });
        });
    });
});