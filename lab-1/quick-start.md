Run MongoDB Server

```
./bin/mongod --dbpath c:/mongodb/data --port 27017
```

Run MongoShell

```
./bin/mongo --host localhost --port 27017
```

Drop current collections

```
use mydb
db.clients.drop()
db.products.drop()
db.sells.drop()
```

Create new collection

```
use mydb
db.createCollection('clients')
db.createCollection('products')
db.createCollection('sells')
```

Import JSONs

```
./bin/mongoimport --db mydb --collection clients --jsonArray c:/mongodb/data-mocks/clients.json
./bin/mongoimport --db mydb --collection products --jsonArray c:/mongodb/data-mocks/products.json
./bin/mongoimport --db mydb --collection sells --jsonArray c:/mongodb/data-mocks/sells.json
```

Backup DB

```
./bin/mongodump --db mydb --out c:/mongodb/backup
```

Restore DB

```
./bin/mongorestore --db mydb --drop c:/mongodb/backup/mydb
```
