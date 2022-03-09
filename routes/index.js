const middleware = require('../middleware')

const users = require('../controllers/users/v1')
const userSchema = require('../controllers/users/v1/schema')

const books = require('../controllers/books/v1')
const bookSchema = require('../controllers/books/v1/schema')

const orders = require('../controllers/orders/v1')
const orderSchema = require('../controllers/orders/v1/schema')

module.exports = (app) => {
  // Getting user list or user info by requested id
  app.get('/users/:id?', middleware(userSchema.list, 'params'), (req, res) => req.params.id ? users.find(req, res) : users.list(res))

  // Create a new user
  app.post('/users', middleware(userSchema.create, 'body'), users.create)

  // Getting book list or book info by requested id
  app.get('/books/:id?', middleware(bookSchema.list, 'params'), (req, res) => req.params.id ? books.find(req, res) : books.list(res))

  // Create a new book
  app.post('/books', middleware(bookSchema.create, 'body'), books.create)

  // Borrow book
  app.post('/users/:user/borrow/:book', middleware(orderSchema.borrow, 'params'), orders.borrow)

  // Return book
  app.post('/users/:user/return/:book', middleware(orderSchema.return, 'params'), orders.return)
}
