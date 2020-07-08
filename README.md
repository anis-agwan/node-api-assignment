# node-api-assignment

## Login and Signup API for User and Shopkeeper

1. Install dependencies

```
npm install
```
2. Files description
```
|config
|      |-db.js: Configuration file to connect to the MongoDB
|      
|middleware: Authentication of loggedin user/vendor
|          |-authshopkeeper.js
|          |-authuser.js
|model: Model Schema for Product,User and Shopkeeper
|     |- Product.js
|     |- User.js
|     |- Shopkeeper.js
|node_modules
|routes: Routing paths for user and shopkeeper with API methods
|      |- user.js
|      |- shopkeeper.js
|README.md
|index.js: File for functionality
|package.json: Dependencies and scripts
|package-lock.json
```

3. Connect to the Mongo database of your own
```
db.js
     |-const MONGOURI = "mongodb+srv://{username}:{password}@cluster0.zyoqm.mongodb.net/test";
```
