## How to use

Create secret.json with your MongoDB params:
```
{
    "host": "ds100500.mongolab.com",
    "port": 100500,
    "name": "slack-archive",
    "username": "bobr",
    "password": "dobr"
}
```

Save your exported zip file and run export command (it will unzip and export all data to the DB)
```
npm run exportToDb -- --file archive.zip
```

Then start it with
```
npm run start
```