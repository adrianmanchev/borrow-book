const {
  Book
} = require('../../../models')

const attributes = ['id', 'name', 'score']

module.exports = {
  create: (req, res) => {
    try {
      Book.create(req.body)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  },
  find: (req, res) => {
    try {
      Book.findOne({
        where: {
          id: req.params.id
        },
        attributes: attributes
      })
      .then(result => {
        if (!result) {
          return res.status(200).send({
            error: 'Book not found'
          })
        }

        result.score = result.score || -1
        res.status(200).send(result)
      })
      .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  },
  list: (res) => {
    try {
      Book.findAll({
        attributes: attributes
      })
      .then(result => res.status(200).send(result))
      .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
