const Performer = require('../models/model_performer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const performer = new Performer({
    name: data.name,
    experience: data.experience,
    workers: data.workers,
  })

  return new Promise((resolve, reject) => {
    performer.save(function (err, createdPerformer) {
      if (err) {
        reject(err)
      } else {
        resolve(createdPerformer)
      }
    })
  })
}
