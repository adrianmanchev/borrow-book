const Joi = require('joi')

module.exports = {
  borrow: Joi.object({
    user: Joi.number().integer().greater(0),
    book: Joi.number().integer().greater(0)
  }),
  return: Joi.object({
    user: Joi.number().integer().greater(0),
    book: Joi.number().integer().greater(0)
  })
}
