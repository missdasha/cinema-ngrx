const { Schema, model } = require('mongoose');
const { FORMATS } = require('../config/constants');
require('./Cinema');

const seanceSchema = new Schema({
  film: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Film'
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  cinema: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Cinema'
  },
  hallNumber: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true,
    enum: FORMATS
  },
  occupiedSeats: [[Boolean]],
  prices: {
    Standard: Number,
    'Love Seats': Number,
    VIP: Number
  }
});

module.exports = model('Seance', seanceSchema);
