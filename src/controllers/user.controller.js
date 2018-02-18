const logger = require('../config/env/env').logger;

module.exports = {

    getAllUsers(req, res) {

    },

    getUserById(req, res) {

        const inputUserId = req.params.userId || '';


    },

    getUserByEmail(req, res) {

        const inputUserEmail = req.params.email || '';



    },

    addUser(req, res) {
        const body = req.body || '';

        // session.run("CREATE (n:User {firstName: {firstName}, prefix: {prefix}, lastName: {lastName}, email: {email}, password: {password}, lat: {lat}, long: {long}, age: {age}, city: {city}, sports: {sports}, bio: {bio}, imageURL: {imageURL}, sports: {sports}, events: {events}}) RETURN n",
        //     {
        //         firstName: body.firstName,
        //         prefix: body.prefix,
        //         lastName: body.lastName,
        //         email: body.email,
        //         password: body.password,
        //         lat: body.lat,
        //         long: body.long,
        //         age: body.age,
        //         city: body.city,
        //         sports: body.sports,
        //         bio: body.bio,
        //         imageURL: body.imageURL,
        //         sports: body.sports,
        //         events: body.events
        //     }
        // )
    }
};