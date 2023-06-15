const Project = require('../models/model_project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Project.findByIdAndDelete(data.id, function (err, deletedProject) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedProject)
      }
    })
  })
}
