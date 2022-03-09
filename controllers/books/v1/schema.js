const Joi = require('joi')

module.exports = {
  list: Joi.object({
    id: Joi.number().integer().greater(0).messages({
      'number.greater': 'Requested param should be an integer value, greater than 0 (zero).',
      'number.integer': 'Requested param should be an integer value',
      'number.base': 'Requested param should be a number'
    })
  }),
  create: Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
      'string.required': 'Missing parameter "name"',
      'string.max': 'Parameter "name" should be less than or equal to 255 characters long',
      'string.min': 'Parameter "name" should be at least 2 characters long',
      'string.empty': 'Parameter "name" shouldn\'t be empty'
    })
  })
}
