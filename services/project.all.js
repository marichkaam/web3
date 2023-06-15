const Project = require('../models/model_project')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Project.find()
      .exec(function (err, projects) {
        if (err) {
          reject(err)
        } else {
          resolve(projects)
        }
      })
  })
}
