- Schema is a structure for DB 
- Can create schemas through mongoose
- Schemas create a document but also create a model
- Model is a collection where we store documents 

---

1. Create a folder `models`.
   1. Created `posts.js` in it
2. Created a schema and model and exported it 
3. Using mongoose architecture and schema, modified the create posts route with the model functionality.
4. The traditional method of insertOne() will return an object with acknowledged, insertedId like keys but the model method of `model.create()` will directly return the object.
5. Using the schema based approach.... only the keys in the schema will be allowed to enter in the DB and not any random ones sent through the request body.
6. If adding `unique: true` validation in the schema then need to reset whole DB by deleting it or restarting mongoose
7. Updated the create and get routes with the schema methods.