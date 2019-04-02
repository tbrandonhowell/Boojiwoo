require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const moment = require('moment');
const helmet = require('helmet');
const PORT = process.argv[2] || process.env.PORT || 3333;
const app = express();
const db = require('./models');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(morgan('dev')); // Hook up the HTTP logger
app.use(express.static('public'));

require('./config/passport')(db, app, passport); // pass passport for configuration

// var my_var = 6;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'boojiwoo@gmail.com',
    pass: 'project2team2'
  }
});

// wrap in a route that grabs all the emails from the database
const mailOptions = {
  from: 'boojiwoo@gmail.com', // sender address
  to: 'thomas1jmccarthy@gmail.com', // list of receivers
  subject: 'Hit your goals today.', // Subject line
  html: '<p>Be sure to earn your boojiwoo points today.</p>'// plain text body
};

schedule.scheduleJob('0 47 20 * * *', function () {
  console.log('schedule is happening');
  transporter.sendMail(mailOptions, function (err, info) {
    console.log(err);
    console.log(info);
  });
});

// Define our routes
app.use(require('./routes/htmlRoutes')(db));
app.use('/api', require('./routes/apiRoutes')(passport, db));

// Secure express app
app.use(helmet.hsts({
  maxAge: moment.duration(1, 'years').asMilliseconds()
}));

// catch 404 and forward to error handler
if (app.get('env') !== 'development') {
  app.use((req, res, next) => {
    let err = new Error('Not Found: ' + req.url);
    err.status = 404;
    next(err);
  });
}

db.sequelize.sync({ force: process.env.FORCE_SYNC === 'true' }).then(() => {
  if (process.env.FORCE_SYNC === 'true') {
    require('./db/seed')(db);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});
