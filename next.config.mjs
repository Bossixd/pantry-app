import 'dotenv/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
    API_KEY: "AIzaSyAHi6OqqYdoxlAlN_czYQcHe4W3CX7sW1o",
    AUTH_DOMAIN: "headstarter-week-2-pantry-app.firebaseapp.com",
    PROJECT_ID: "headstarter-week-2-pantry-app",
    STORAGE_BUCKET: "headstarter-week-2-pantry-app.appspot.com",
    MESSEGING_SENDER_ID: "789628412507",
    APP_ID: "1:789628412507:web:9bb2a27191108d6a12157e"
};

// const nextConfig = {
//     API_KEY: process.env.API_KEY,
//     AUTH_DOMAIN: process.env.AUTH_DOMAIN,
//     PROJECT_ID: process.env.PROJECT_ID,
//     STORAGE_BUCKET: process.env.STORAGE_BUCKET,
//     MESSEGING_SENDER_ID: process.env.MESSEGING_SENDER_ID,
//     APP_ID: process.env.APP_ID
// };


export default nextConfig;
