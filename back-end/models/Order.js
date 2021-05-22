const { Schema, model } = require('mongoose');
require('./Seance');
require('./Film');

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  seance: {
    type: Schema.Types.ObjectId,
    ref: 'Seance'
  },
  services: [
    { 
      amount: {
        type: Number,
        required: true
      },
      service: {
        type: Schema.Types.ObjectId, ref: 'Service',
        required: true
      }
    }
  ],
  seats: [
    {
      row: { 
        type: Number,
        required: true
      },
      seat: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }
  ],
  totalCost: {
    type: Number,
    required: true
  }
});

module.exports = model('Order', orderSchema);
