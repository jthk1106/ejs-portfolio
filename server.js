const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile')
const PORT = process.env.PORT || 8080;

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// define the route that will use your custom router
app.use('/profile', profile)
// here we're setting the views directory to be ./views
// thereby letting the app know where to find the template files
app.set('views', './views');

// here we're setting the default engine to be ejs
// note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

// now instead of using res.send we can use
// res.render to send the output of the template by filename
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.post('/thanks', (req, res) => {
    console.log('req.body: ', req.body)
    const msg = {
        to: 'thk116@gmail.com',
        from: 'testTWO@example.com',
        subject: `Message from ${req.body.firstName}`,
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    res.render('thanks', { contact: req.body })
})

app.listen(PORT, () => {
    console.log(`listening at http://localhost: ${PORT}`);
})
