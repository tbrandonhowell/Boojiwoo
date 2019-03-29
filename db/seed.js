module.exports = (db) => {
  db.User.create({
    firstName: 'Joe',
    userName: 'Gates',
    email: 'j@g.co',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  });
  db.User.create({
    firstName: 'Jane',
    userName: 'Jobs',
    email: 'j@j.co',
    password: process.env.USER_PWD,
    isAdmin: false
  });
};
