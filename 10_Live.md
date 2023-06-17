

process.exit(0)
to race shutdown the server with success response
will systematically shut down the event loop of nodejs

1. Created usersSchema in the `models/users.js`
2. Created router for users in `routes/users.js`
   1. Adopted one new programming Paradigm in which we can chain the different HTTP request methods under one parent router.route()
```
router.route("/")
    .post((req, res) => {...})
    .get()
    .put()
    .delete()
```
3. Used that route in the `server.js` using `app.use()`
4. Created a utility function `randomSecureKey()` to create uid in a new folder `utils/index.js`