const express = require('express')
const router = express.Router()

// middleware that's specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
router.get('/', (req, res) => {
    res.send('Hello world')
})
// define the about route
router.get('/about', (req, res) => {
    res.send('About me')
})

router.route('/chain')
    .get((req, res) => {
        res.send('chain')
    })
    // .post((req, res) => {
    // // code to handle ...
    //     res.send('A project was added')
    // })
    // .put((req, res) => {
    // // code to handle ...
    //     res.send('A project was added')
    // })
    // .delete((req, res) => {
    // // code to handle ...
    //     res.send('A project was deleted')
    // })
module.exports = router