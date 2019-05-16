const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const synthSchema = new Schema({
  notes: [String],
  oscillator: {
    oscType: {type: String, enum: ['triangle', 'sine', 'square']}
  },
  envelope: {
    attack: Number,
    decay: Number,
    sustain: Number,
    release: Number
  }
}, {_id: false});

const samplerSchema = new Schema({
  notes: [String],
  style: {type: String, enum: ['house']},
}, {_id: false});

const songSchema = new Schema({
  userId: {type: ObjectId, ref: 'User'},
  name: String,
  tempo: {type: Number, min: 70, max: 160, default: 130},
  instruments: {
    synths: [synthSchema],
    samplers: [samplerSchema],
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;