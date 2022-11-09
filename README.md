# Getting Started with Create React App

This project was created in two phases simultaneously
1. Server side for handling backend
2. React frontend
 
## Available Scripts

### For Server Side
Dependencies are to create a mongo db (for handling users and logins) and a cloudinary account [https://cloudinary.com/](https://cloudinary.com/) (for images and search)

Once the mongo db and cloudinary account is setup, the mongo db url and cloudinary cloud name, api key and secret can be set
for the app under the .env file in the search-server folder

When everything is setup, use `npm start` to run the backend API server 

### For Client Side
Do check the versions used for the packages in package.json file and when server is up and running,
use `npm start` to run the react server

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Dont forget to do npm install in both folders search-app and search-server separately

## References

1. [https://cloudinary.com/](https://cloudinary.com/)
2. [https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd) - For understanding react auth and logins
3. [https://www.youtube.com/watch?v=f2EqECiTBL8&t=0s](https://www.youtube.com/watch?v=f2EqECiTBL8&t=0s) - For understanding backend logins and auth
4. [https://www.youtube.com/watch?v=KsjixiVhVyY](https://www.youtube.com/watch?v=KsjixiVhVyY) - For understanding usage of Cloudinary API