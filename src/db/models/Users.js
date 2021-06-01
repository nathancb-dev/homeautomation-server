const mongoose = require("../mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    this.updatedAt = new Date();

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;