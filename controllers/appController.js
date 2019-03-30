module.exports = function () {
  return {
    getData: (req, res) => {
      res.json({
        data: {
          name: 'sample',
          message: 'you should see this only if you are logged in.'
        }
      });
    },
    newTask: (req, res) => {
    },
    getTasks: (req, res) => {
    },
    updateTask: (req, res) => {
    },
    completeTask: (req, res) => {
    },
    getAllSwag: (req, res) => {
    },
    getOwnedSwag: (req, res) => {
    },
    purchaseSwag: (req, res) => {
    },
    updateAvatar: (req, res) => {
    },
  };
};
