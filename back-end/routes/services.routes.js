const { Router } = require('express');
const router = Router();
const Service = require('../models/Service');
const OperationalError = require('../helpers/OperationalError');
const { 
  DUPLICATED_SERVICE_INFO_MESSAGE, 
  SERVICE_IS_ADDED_MESSAGE,
  ADMIN
 } = require('../config/constants');
const { giveAccessTo } = require('../helpers/routeHelpers');
const passport = require('passport');

router.post('/new', passport.authenticate('jwt', { session: false }), giveAccessTo([ADMIN]),
async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;
    const service = await Service
                          .findOne({ $or: [ { name, quantity}, { name, price } ] });
    if (service) {
      return next(new OperationalError(DUPLICATED_SERVICE_INFO_MESSAGE, 403));
    }
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json({ message: SERVICE_IS_ADDED_MESSAGE, data: savedService });
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
