const Project = require('../models/model_project')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const project = new Project({
    name: data.name,
    customerId: data.customerId,
    minExp: data.minExp,
  })

  return new Promise((resolve, reject) => {
    project.save(function (err, createdProject) {
      if (err) {
        reject(err)
      } else {
        resolve(createdProject)
      }
    })
  })
}
