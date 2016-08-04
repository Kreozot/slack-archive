This project is almost abandoned. Now it is just stupid archive without any design and usability shit - only channels and messages.

## How to use

```
git clone https://github.com/Kreozot/slack-archive.git
cd slack-archive
npm i
```

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

Go to localhost:5000