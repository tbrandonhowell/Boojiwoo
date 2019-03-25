module.exports = function (db) {
  return {
    getData: function (req, res) {
      res.json({
        data: {
          name: 'sample',
          message: 'you should see this only if you are logged in.'
        }
      });
    }
  }
};
