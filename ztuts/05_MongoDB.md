#### 2 types of DB : 

1. SQL 
2. NoSQL 
   1. MongoDB is a Document based NoSQL

- SQL Table <-> MongoDB's `Collection`
- SQL Row <-> MongoDB's `Document` (basic unit of data storage which is a JSON like structure. Document can have multiple fields with values of various data types like array, documents, binary data, etc)

---

### NoSQL benefits : 

1. Quick insert & retrieval ( regarding whole nested documents n objects)
2. Easily changable schema 
3. Horizatally scalable (sharding)
4. Built for quick analytics/metrics/aggregation.

### NoSQL disadvantages :

1. Not built for updates(which is delete+insert) (ACID properties are not garaunteed)
   1. So transactional properties are not used
2. Not read optimized ( map & reduce functions would come to use to go to each objects whereas in SQL one whole column is focused upon)
3. No implicit Relations ( cannot force a foreign key constraint )
4. JOINs are hard ( need to parse each document and check for the condition)

### When NoSQL can be used ? 

For the following requirements : 

1. Block size data 
2. Too many writes (write optimized) n less updates 

---

- `Mongo Shell` - Command line tool to operate on MongoDB
- `Mongoose` - A tool provided for using MongoDB along with NodeJS ODM (Object Data Modelling). ODM is a library which helps us to create schemas and other functionalities to handle for MongoDB. **It is a layer sitting between MongoDB & NodeJS ExpressJS**

