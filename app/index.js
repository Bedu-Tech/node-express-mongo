const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./schemas/product');

// Initialize application
const app = express();
const port = 8080;

// Defining parsing
// ?limit=10
// { limit: 10 }
app.use(bodyParser.urlencoded({ extended: true }));
// {}
app.use(bodyParser.json());

// Routing
const globalRouter = express.Router();
const router = express.Router();

// root
globalRouter.get('/', (req, res) => {
  return res.json({
    message: 'Go to /api'
  });
});

// /api
router.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to my Rest API'
  });
});

router.post('/product', (req, res) => {
  const errors = []
  const { name, description, price } = req.body
  // Validating
  if (!name) { errors.push('Name field is required') }
  if (!description) { errors.push('Description field is required') }
  if (!price) { errors.push('Price field is required') }
  // Evaluate validations
  if (errors.length > 0) {
    return res.status(400).json({
      errors
    });
  }
  const product = new Product({ name, description, price });
  product.save((err) => {
    if (err) return res.status(500).json({ message: err })
    return res.status(201).json({
      data: product
    });
  });
  /* return res.json({
    message: 'Product created!'
  }); */
});

// Prefix
app.use('/', globalRouter);
app.use('/api', router);

// Listening
app.listen(port);
console.log(`API listening on port ${port}`);