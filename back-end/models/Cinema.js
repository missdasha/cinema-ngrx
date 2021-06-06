const { Schema, model } = require('mongoose');
const { SEATS_TYPES } = require('../config/constants');
require('./Service');

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  halls: [
    {
      seatsTypes: {
        type: [String],
        enum: SEATS_TYPES
      },
      plan: {
        type: [[String]],
        enum: SEATS_TYPES
      },
    }
  ],
  additionalServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }]
});

module.exports = model('Cinema', cinemaSchema);
