const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  songs: [{type: ObjectId, ref: 'Song'}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
