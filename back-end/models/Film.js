const { Schema, model } = require('mongoose');
const { AGE_RESTRICTIONS } = require('../config/constants');
require('./Seance');

const filmSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  genres: [String],
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    enum: AGE_RESTRICTIONS
  },
  imageSrc: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    hours: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      default: 0
    }
  },
  startDate: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    required: true
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false
}
);

filmSchema.virtual('seances', {
  ref: 'Seance',
  localField: '_id',
  foreignField: 'film',
  justOne: false,
  match: { startTime: { $gt: Date.now() / 1000 } },
  options: { sort: { startTime: +1 } }
});

module.exports = model('Film', filmSchema);
