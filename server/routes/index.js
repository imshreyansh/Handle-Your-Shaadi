const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

module.exports.mountRoutes = (app) => {
    fs.readdirSync(__dirname).filter(file => {
        if (file !== "index.js") {
            const routes = require('./' + file);
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            routes.routes(express, app)
        }
    })
}