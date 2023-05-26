#### 2 types of DB : 

1. SQL 
2. NoSQL 
   1. MongoDB is a Document based NoSQL

- SQL Table <-> MongoDB's `Collection`
- SQL Row <-> MongoDB's `Document` (basic unit of data storage which is a JSON like structure. Document can have multiple fields with values of various data types like array, documents, binary data, etc)

- `Mongo Shell` - Command line tool to operate on MongoDB
- `Mongoose` - A tool provided for using MongoDB along with NodeJS ODM (Object Data Modelling). ODM is a library which helps us to create schemas and other functionalities to handle for MongoDB. **It is a layer sitting between MongoDB & NodeJS ExpressJS**