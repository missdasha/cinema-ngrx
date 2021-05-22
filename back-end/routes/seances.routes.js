const { Router } = require('express');
const router = Router();
const Seance = require('../models/Seance');
const OperationalError = require('../helpers/OperationalError');
const {
  DUPLICATED_SEANCE_INFO_MESSAGE,
  SEANCE_IS_ADDED_MESSAGE,
  SEANCE_IS_NOT_FOUND_MESSAGE,
  INTERVAL,
  ADMIN
} = require('../config/constants');
const { giveAccessTo } = require('../helpers/routeHelpers');
const passport = require('passport');

router.post('/new', passport.authenticate('jwt', { session: false }), giveAccessTo([ADMIN]),
async (req, res, next) => {
  try {
    const { startTime, endTime, cinema, hallNumber } = req.body;
    const seance = await Seance
                          .findOne({ 
                            startTime: { $lt: endTime + INTERVAL }, 
                            endTime: { $gt: startTime - INTERVAL },
                            cinema,
                            hallNumber
                          });
    if (seance) {
      return next(new OperationalError(DUPLICATED_SEANCE_INFO_MESSAGE, 403));
    }
    const newSeance = new Seance(req.body);
    const savedSeance = await newSeance.save();
    res.status(201).json({ message: SEANCE_IS_ADDED_MESSAGE, data: savedSeance });
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:seanceId', async (req, res, next) => {
  try {
    const seance = await Seance
                          .findById(req.params.seanceId)
                          .populate({ path: 'cinema', select: 'city name address -_id' });                    
    if (seance) {
      return res.status(200).json(seance);
    }
    next(new OperationalError(SEANCE_IS_NOT_FOUND_MESSAGE, 404));
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
