## Social Media App - Instagram clone 

- Backend part 
- Tech stack : 
  - NodeJS
  - ExpressJS
  - MongoDB

Goals : 

1. API part
2. Searching & sorting 
3. DB Part (MongoDB too)
4. Express connection ( in-depth )
5. Error handling in APIs & ExpressJS
6. Debugging and developer testing applications

- Trying to cover major aspects of any social media app and not only instagram 

#### Functional requirements of the SM app :

1. Users resource on server
   1. CRUD posts
   2. Like, comment, follow
2. Auth module 
   1. Register 
   2. Sign in 
   3. Protected routes (follow only from signed in account)
3. Posts resource on server
   1. Created by user 
   2. Likes, comments 
   3. Image, captions 
4. Follow resource 
   1. Store users who follow other users 
5. Messaging 
6. News feed 
   1. List of posts 
   2. Using a simple Generator 

#### Database concepts 

1. Schemas - It has the DB structure 

- SQL : Tables 
- NoSQL : Schemas 

Tables : 

1. Users
2. Posts 
3. Comments 
4. Likes
5. Follows (one way relation)

#### How to store images ?

- Non feasible options : 
  1. Server
  2. DB 
- Feasible option 
  3. Object storage (AWS S3, Firebase cloud storage, Google drive)
     1. Will get public URL to access the image 
- Can use CDN along with it 
  - It is a geo-region based caching technique
  - Caches images globally

#### Architecure design 

1. REST principles 
2. Follow ES Lint rules to structure the code
3. Flow of server 
4. Controller
5. Config, env files 


