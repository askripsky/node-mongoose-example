var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    sex: { type: String, default: 'F' }
});

userSchema.statics = {
    getMales: function (cb) {
        this.find({ sex: 'M' }, cb);
    }
};

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', userSchema);