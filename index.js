const express = require('express');

// For using Google OAuth 2.0
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// creates an instance of the google passport strategy and passes google client and secret for authentication
passport.use(new GoogleStrategy({ 
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access: token', accessToken);
        console.log('refresh token:', refreshToken);
        console.log('profile', profile);
    })
);

// makes a request to google servers for authentication - user's consent
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

// redirect url when user grants access and authentication is successful
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 3400;
app.listen(PORT);