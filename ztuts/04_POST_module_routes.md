1. Refer Posts schema table 

|user_id|post_id|caption|image_url|time_stamp|
|---|---|---|---|---|
|string|string, primary|string|string|date_time|

2. Will have CRUD operations on the Posts
   - Get all posts
   - Get single post: will take an ID in request params
   - Create a post: will take post in request body
   - Update a post: will take an ID in request params and a body
   - Delete a post: will take an ID in request params
3. Common API response structure 
```
{
    "message": "<string> success or failure indication",
    "data": "<array|object> response data",
    "error": "<string|undefined> if failed then error message"
}
```
4. mkdir routes 
5. Will make dummy calls in the `posts.js` and export it to the server.js through a `index.js`