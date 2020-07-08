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
4. Start the server
```
node index.js
```
5. Test the API on Postman or similar applications.

5.1: Check if API is working
```
http://localhost:4000/
response: {message: API working}
```
5.2: Sign up User and Vendor:
```
USER
http://localhost:4000/user/signup
body: 
{ 
"username": "<username>
"email" : "<your-email>",
"password": "<your-password>"
}

VENDOR
http://localhost:4000/vendor/signup
body:
{ 
"mobile" : "<mobile>",
"email" : "<your-email>",
"password": "<your-password>"
}
```

5.3: Login User and Vendor:
```
USER
http://localhost:4000/user/login
body: 
{ 
"email" : "<your-email>",
"password": "<your-password>"
}

VENDOR
http://localhost:4000/vendor/login
body:
{ 
"mobile" : "<mobile>",
"password": "<your-password>"
}
```

5.4 GET the product lists of Vendor:
```
VENDOR
http://localhost:4000/vendor/list
```
