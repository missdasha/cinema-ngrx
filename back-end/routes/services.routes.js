const { Router } = require('express');
const router = Router();
const Service = require('../models/Service');
const OperationalError = require('../helpers/OperationalError');
const { DUPLICATED_SERVICE_INFO_MESSAGE, SERVICE_IS_ADDED_MESSAGE } = require('../config/constants');

router.post('/new', async (req, res, next) => {
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

module.exports = router;
