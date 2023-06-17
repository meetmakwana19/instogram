## Users CRUD API

1. Shifting the db connection part from server.js to a new file `config/db.js`
   1. Learnt new concept of using `process.exit(0)` to programmatically terminate node processes.
2. Created usersSchema in the `models/users.js`
3. Created router for users in `routes/users.js`
   1. Adopted one new programming Paradigm in which we can chain the different HTTP request methods under one parent router.route()
   2. Installed necesary packages such as `bcrypt`, `express-validator` needed throughout the development of routes 
```
router.route("/")
    .post((req, res) => {...})
    .get()
    .put()
    .delete()
```
1. Used that route in the `server.js` using `app.use()`
2. Created a utility function `randomSecureKey()` to create uid in a new folder `utils/index.js`.
3. Created a middleware `errorHandler.js` which comes after all the middlwares and routes in the the `server.js`.
   1. If there are syntactical erros in the req.body then even beffore the request gets process, the body error is handled over by this middleware otherwise the server get freeze due to unhandled error.... etc etc such type of unexpected errors can be handled by this middleware
4. Also created a commonplace from where all errors can be generated and handled globally. So created `ApiError.js` class in utils folder.
5. Hashing happens before so need to put check on body to accept password first in register user so used `express-validator` package in `routes/users.js` 
6.  ***Your errros should always be first checked and success response should be executed at the very end***
7.  commonjs vs modulejs...2 types of js
8.  `node_modules/.bin` folder has all command runners
9.  Installed eslint
```
npm i eslint
```
10. Configured it
```
npm init @eslint/config
```
11. To run ESLint on the project to check all the files(.)
```
./node_modules/.bin/eslint .
```
12. d

---

Issues : 

1. Updating user password replaces the hash.