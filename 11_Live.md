1. Creating firebase account
   1. Create a new project by `+Add project` from console
   2. Go to storae tab --> Get started --> default settings --> Done 
   3. Go to settings --> Project settings --> Service accounts --> Firebase Admin SDK --> Select NodeJS --> Create new private key
   4. THis will download a json file which should be kept very secretly.
2. Installed this package for env variables `npm i dotenv`
   1. env file doesnt need quotes "".. it can directly understand from left and right side of = so dont put ""
   2. Can delete local-constants.js now as no longer its needed.
3. Process cycle has access to all the environment variables
4. Created `.example.env`, `local.env` and `.test.env` files along with `.env` file
5. To System environment in linux : `export NODE_ENV=local`
```
export NODE_ENV=local
```
This tells OS that there is some variable called 'NODE_ENV' with 'local' value
6. Updated `package.json` with the scripts. Can run files with these commands 
```
npm run start
npm run start:dev
npm run start:test
```
7. Install firebase-admin sdk
```
npm i firebase-admin
```
8. Downloaded and got the service key json file in this project directory
9. Created a utils `firebase.js`
10. Created a new `BUCKET_NAME` env variable.
11. Installed multer by `npm i multer`. Multer is a readymade middleware for dealing with multupart/form-data.....will use memory storage for faster speed and volatality.
12. Added a new middleware `uploader.js` and added it in POST posts route.

#### Debugger setup

1. Go to 'Run & Debug' tab of vs code
2. Rnn debug ---> create a new `launch.json` file (this file will be created in .vscode folder) and select nodejs
   1. Add this in the configuration of `launch.json`
```
"env": {
    "NODE_ENV": "local"
}
```
3. Using debugger, we can pause execution in a process


---

Suddenly start getting error of db connection 
```
Database connection failed and the error is :  Error: queryTxt ETIMEOUT meet-dev
    at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:251:17) {
  errno: undefined,
  code: 'ETIMEOUT',
  syscall: 'queryTxt',
  hostname: 'meet-dev.mongodb.net'
}
```
So solved it by changing the connection url by chosing node version 2.2.12 or later and replaced the connection string 
Src : https://stackoverflow.com/a/63904033/17796286