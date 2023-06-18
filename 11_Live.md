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
1. ds