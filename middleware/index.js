module.exports = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    })

    if (!error) {
      req[property] = value
      next()
    } else {
      res.status(400).json({
        error: error.details.map(i => i.message).join(', ')
      })
    }
  }
}
