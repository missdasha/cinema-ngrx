const { Router } = require('express');
const router = Router();
const Cinema = require('../models/Cinema');
const OperationalError = require('../helpers/OperationalError');
const { formQuery } = require('../helpers/routeHelpers');
const { 
  CINEMA_IS_ADDED_MESSAGE,
  CINEMA_IS_NOT_FOUND_MESSAGE,
  DUPLICATED_CINEMA_NAME_MESSAGE,
  DUPLICATED_CINEMA_ADDRESS_MESSAGE,
  ADMIN
} = require('../config/constants');
const { giveAccessTo } = require('../helpers/routeHelpers');
const passport = require('passport');

router.post('/new', passport.authenticate('jwt', { session: false }), giveAccessTo([ADMIN]), 
async (req, res, next) => {
  try {
    const { name, address, city } = req.body;
    const cinemaWithDuplicatedName = await Cinema.findOne({ name });
    if (cinemaWithDuplicatedName) {
      return next(new OperationalError(DUPLICATED_CINEMA_NAME_MESSAGE, 403));
    }
    const cinemaWithDuplicatedAddress = await Cinema.findOne({ address, city });
    if (cinemaWithDuplicatedAddress) {
      return next(new OperationalError(DUPLICATED_CINEMA_ADDRESS_MESSAGE, 403));
    }

    const newCinema = new Cinema(req.body);
    const cinema = await newCinema.save();
    res.status(201).json({ message: CINEMA_IS_ADDED_MESSAGE, cinema });
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const query = formQuery(req.query);
    const cinemas = await Cinema.find({}).select(query);
    return res.status(200).json(cinemas);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/:cinema', async (req, res, next) => {
  try {
    const cinema = await Cinema
                          .findOne({ name: req.params.cinema }, 'address halls -_id')
                          .populate('additionalServices');
    if (cinema) {
      return res.status(200).json(cinema);
    }
    next(new OperationalError(CINEMA_IS_NOT_FOUND_MESSAGE, 404));
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
