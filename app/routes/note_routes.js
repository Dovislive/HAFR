var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
  app.get('/products', (req, res) => {
    db.collection('products').find().limit(10).toArray()
      .then(out => res.send(out))
    // .then(() => conn.close());
  });
  app.post('/products', (req, res) => {
    const product = { name: req.body.name, img: req.body.img, descr: req.body.descr, prize: req.body.prize };
    //      const { headers, method, url } = req;
    console.log(24, req.body);
    db.collection('products').insert(product, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
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
        res.send('Product ' + req.body.name + ' DELETE!');
      }
    });
  });
  app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const product = { name: req.body.name, img: req.body.img, descr: req.body.descr, prize: req.body.prize };
    db.collection('products').update(details, product, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.json('Product ' + req.body.name + ' changed!');
      }
    });
  });
};