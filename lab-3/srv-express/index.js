var express = require('express');

// express не умеет парсить body самостоятельно :(, поэтому нужны эти пакеты
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var MongoClient = require('mongodb').MongoClient;

var app = express();
var expressPort = 3017;

var multipartMiddleware = multipart();

var url = 'mongodb://localhost:27017';
var dbName = 'mydb';

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  // res.setHeader('Content-type', 'application/json; charset=utf-8');
  next();
});

// импорт из другого файла
var idComparator = require('./utils').idComparator;

app.get('/api/clients', function (req, res) {
  var client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection.find({}).toArray(function (err, docs) {
        // сортируем результаты
        var sortedDocs = (docs || []).sort(idComparator);

        res.json(sortedDocs);
      });

      client.close();
    }
  });
});

app.get('/api/clients/:id', function (req, res) {
  var client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection.findOne({ id: +req.params.id }).then(function (doc) {
        res.json(doc);
      });

      client.close();
    }
  });
});

app.delete('/api/clients/:id', function (req, res) {
  var client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection.deleteOne({ id: +req.params.id }).then(function (result) {
        console.log(
          'Doc with id=' +
            req.params.id +
            ' has been successfuly deleted from Сlients'
        );
        console.log('Result', result.result);
        res.send(result);
      });

      client.close();
    }
  });
});

app.post('/api/clients', multipartMiddleware, function (req, res) {
  console.log('Request body', req.body);

  var client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      // получаем список всех документов
      collection.find({}).toArray(function (err, docs) {
        // сортируем результаты
        var sortedDocs = (docs || []).sort(idComparator);

        // определяем новый ID
        var newId = (sortedDocs.pop() || { id: 1 }).id + 1;

        // добавляем его в body
        var extBody = Object.assign({}, req.body, { id: newId });

        collection.insertOne(extBody).then(function (result) {
          console.log('New doc has been successfuly inserted into Сlients');
          console.log('Result', result.result);
          res.send(result);
        });
      });
    }
  });
});

app.put('/api/clients/:id', multipartMiddleware, function (req, res) {
  var client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection
        .updateOne({ id: +req.params.id }, { $set: req.body })
        .then(function (result) {
          console.log(
            'Doc with id=' +
              req.params.id +
              ' has been successfuly updated in Сlients'
          );
          console.log('Result', result.result);
          res.send(result);

          client.close();
        });
    }
  });
});

// Сложно! Только для Джедаев!
// получение списка документов из другой коллекции связанного с определенным документом коллекции
// например, получение списка всех продаж клиенту с определенным id
app.get('/api/clientBuys/:id', function (req, res) {
  var client = new MongoClient(url, { useNewUrlParser: true });

  client.connect(function (err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var sells = db.collection('sells');

      sells
        .find({ client_id: +req.params.id })
        .toArray(function (err, sellsDocs) {
          var productPromises = sellsDocs.map(function (sellsItem) {
            var products = db.collection('products');

            return products.findOne({ id: sellsItem.product_id });
          });

          Promise.all(productPromises).then(function (productDocs) {
            var combinedData = productDocs.map(function (item, index) {
              return Object.assign({}, item, { count: sellsDocs[index].count });
            });

            res.send(combinedData);

            client.close();
          });
        });
    }
  });
});

app.listen(expressPort, function () {
  console.log('Express is running on port', expressPort);
});
