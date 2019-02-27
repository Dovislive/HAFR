var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
  //products
  app.get('/products', (req, res) => {
    db.collection('products').find().limit(100).toArray()
      .then(out => res.send(out))
  });
  app.post('/products', (req, res) => {
    const product = { name: req.body.name, img: req.body.img, descr: req.body.descr, prize: req.body.prize };
    db.collection('products').insert(product, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(200).json(result.ops[0]);
      }
    });
  });
  app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('products').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(200).json({_id: id});
      }
    });
  });
  app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const product = { name: req.body.name, img: req.body.img, descr: req.body.descr, prize: req.body.prize };
    db.collection('products').findOneAndUpdate(details, {$set:product}, {returnOriginal: false}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(200).json(result.value);
      }
    });
  });
  //category
  app.get('/category', (req, res) => {
    db.collection('categories').find().limit(100).toArray()
      .then(out => res.send(out))
  });

  app.post('/category', (req, res) => {
    const category = { name: req.body.name, img: req.body.img };
    db.collection('categories').insert(category, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(200).json(result.ops[0]);
      }
    });
  });
  app.delete('/category/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('categories').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(200).json({_id: id});
      }
    });
  });
  app.put('/category/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const category = { name: req.body.name, img: req.body.img };
    db.collection('categories').findOneAndUpdate(details, {$set:category}, {returnOriginal: false}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.status(200).json(result.value);
      }
    });
  });
};