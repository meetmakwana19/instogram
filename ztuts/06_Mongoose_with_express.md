### Connect MongoDB with NodeJS

- Every database has their own drivers to connect to popular languages
- Similarly, MongoDB has drivers to connect to NodeJS
- Mongoose is an ODM(object data modelling) which helps to model our DB and create schema
- Mongoose is built on top of the mongodb driver to provide programmers with a way to model their data.
- Mongoose plays as a role of abstraction over your database model.



Will use Mongoose to : 
1. Connect to DB
2. Manage Schema
3. CRUD operations
4. Sorting, searching & indexing

---

1. Signed in to MongoDB Atlas
2. Created a new database named `sm_app` with collection `posts` for now.
3. Create a user with simple password in the `Database access` section
4. In `Database` section's landing page, `connectec` > `drivers` > Driver `NodeJS` > copy the url and store it somewhere
5. Added the mongo_uri in a local file of `local-constants.js` and exported it out to use it like environmental variables  
6. npm install mongoose
7. Connected `server.js` with the mongoose