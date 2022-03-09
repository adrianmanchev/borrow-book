const {
  Book,
  User,
  Order
} = require('../../../models')

module.exports = {
  borrow: (req, res) => {
    try {
      Book.findOne({
        where: {
          id: req.params.book
        },
        attributes: ['id', 'name', 'borrowerId']
      })
      .then(book => {
        if (!book) {
          return res.status(200).send({
            error: 'Book not found'
          })
        }

        if (book.borrowerId && parseInt(book.borrowerId) > 0) {
          return res.status(200).send({
            error: `${book.name} is not able to barrow`
          })
        }

        User.findOne({
          where: {
            id: req.params.user
          },
          attributes: ['id']
        })
        .then(user => {
          if (!user) {
            return res.status(200).send({
              error: 'User not found'
            })
          }

          Book.update({
            borrowerId: user.id
          }, {
            where: {
              id: book.id
            }
          })
          Order.create({
            user: user.id,
            book: book.id,
            borrowedAt: new Date()
          })
          .then(result => res.status(200).send(result))
          .catch(err => res.status(200).send(err))
        })
      })
      .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  },
  return: (req, res) => {
    try {
      Book.findOne({
        where: {
          id: req.params.book
        },
        attributes: ['id', 'name', 'borrowerId']
      })
      .then(book => {
        if (!book) {
          return res.status(200).send({
            error: 'Book not found'
          })
        }

        if (book.borrowerId && !parseInt(book.borrowerId)) {
          return res.status(200).send({
            error: `${book.name} is not barrowed, yet`
          })
        }

        User.findOne({
          where: {
            id: req.params.user
          },
          attributes: ['id']
        })
        .then(user => {
          if (!user) {
            return res.status(200).send({
              error: 'User not found'
            })
          }

          Order.findOne({
            where: {
              user: req.params.user,
              book: req.params.book
            },
            attributes: ['id']
          }).then(order => {
            Book.update({
              borrowerId: null
            }, {
              where: {
                id: book.id
              }
            })
            Order.update({
              score: req.body.score,
              returnedAt: new Date()
            }, {
              where: {
                id: order.id
              }
            })
            .then(result => res.status(200).send(result))
            .catch(err => res.status(200).send(err))
          })
        })
      })
      .catch(err => res.status(200).send(err))
    } catch (err) {
      res.status(500).send(err)
    }
  }
}
