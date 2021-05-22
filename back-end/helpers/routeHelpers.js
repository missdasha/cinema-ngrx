const Joi = require('joi');
const { OWNER, ADMIN, ACCESS_DENIED } = require('../config/constants');
const OperationalError = require('../helpers/OperationalError');

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      req.body = result.value;
      next();
    };
  },

  giveAccessTo: userRoles => {
    return (req, res, next) => {
      if (users.includes(OWNER) && req.user.id === req.params.userId || 
          users.includes(ADMIN) && req.user.role === ADMIN) {
        return next();
      }
      next(new OperationalError(ACCESS_DENIED, 403));
    };
  },

  schemas: {
    authSchema: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },
  
  formQuery: (queryParams) => {
    let query = '';
    if (queryParams.select) {
      query = queryParams.select.split(',').join(' ');
    }
    return query;
  }
}
