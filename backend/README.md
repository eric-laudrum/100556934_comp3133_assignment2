# COMP3133_100556934_Assignment1

## Eric Laudrum
## 100556934

A GraphQL-based backend service designed to manage employee records and user authentication.

## Stack 
- MongoDB
- Mongoose
- Modern Node.js


## Setup
bash
npm install 
    
## Environment
Create a .env file with:
- MONGODB_URI
-JWT_SECRET
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

## Run
npm start


## Testing
- Postman JSON available in tests/COMP3133_Assignment1.postman_collection.json

### Use Sample Details Sign in & Login
"username": "TestUser",
"password": "COMP3133"

## Auth Token
Add the Bearer token generated to Authorization field

### Upload image
To upload image, use the text in tests/image.txt in the employee_photo field

### Base64 Image
Test image in Base64 in test/image.txt

