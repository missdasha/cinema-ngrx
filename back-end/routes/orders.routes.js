const { Router } = require('express');
const router = Router();
const Order = require('../models/Order');
const Seance = require('../models/Seance');
const OperationalError = require('../helpers/OperationalError');
const {
  ORDER_IS_ADDED_MESSAGE,
  ORDER_IS_NOT_ADDED_MESSAGE,
  OWNER
} = require('../config/constants');
const passport = require('passport');
const UsersController = require('../controllers/user');
const { giveAccessTo } = require('../helpers/routeHelpers');

router.post('/:userId/new', passport.authenticate('jwt', { session: false }), giveAccessTo([OWNER]),
  async (req, res, next) => {
    try {
      const newOrder = new Order(req.body);
      const order = await newOrder.save();

      const seance = await Seance.findById(req.body.seance);
      req.body.seats.forEach(({ row, seat }) => {
        seance.occupiedSeats[row][seat] = true;
      });
      const updatedSeance = await Seance
                                    .findByIdAndUpdate(
                                      req.body.seance,
                                      { occupiedSeats: seance.occupiedSeats },
                                      { new: true }
                                    );
      if (updatedSeance) {
        return res.status(201).json({ message: ORDER_IS_ADDED_MESSAGE, data: { order, updatedSeance } });
      }
      return next(new OperationalError(ORDER_IS_NOT_ADDED_MESSAGE, 400));
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  });

router.get('/:userId', passport.authenticate('jwt', { session: false }), giveAccessTo([OWNER]),
  async (req, res, next) => {
    try {
      const orders = await Order
                            .find({ userId: req.params.userId })
                            .select('-_id')
                            .populate({
                              path: 'seance',
                              populate: [
                                { path: 'cinema', select: 'name address city -_id' },
                                { path: 'film', select: 'title duration -_id' }
                              ],
                              select: 'startTime hallNumber format prices -_id'
                            })
                            .sort({ "seance.startTime": +1 })
                            .populate({ path: 'services.service', select: '-_id' });
      return res.status(200).json(orders);
    }
    catch (e) {
      console.log(e);
      next(e);
    }
  });

router.get('/', passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;
