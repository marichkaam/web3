const Project = require('../models/model_project')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    Project.findById(id, function (err, project) {
      if (err) {
        reject(err)
      } else {
        resolve(project)
      }
    })
  })
}
