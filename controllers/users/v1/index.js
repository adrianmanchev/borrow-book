const {
  User
} = require('../../../models')

const attributes = ['id', 'name']

module.exports = {
  create: (req, res) => {
    try {
      User.create(req.body)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  },
  find: (req, res) => {
    try {
      User.findOne({
        where: {
          id: req.params.id
        },
        attributes: attributes
      })
      .then(result => {
        if (!result) {
          return res.status(200).send({
            error: 'User not found'
          })
        }

        res.status(200).send(result)
      })
      .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  },
  list: (res) => {
    try {
      User.findAll({
        attributes: attributes
      })
      .then(result => res.status(200).send(result))
      .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
