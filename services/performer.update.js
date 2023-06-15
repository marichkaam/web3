const Performer = require('../models/model_performer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const performerData = {
    name: data.name,
    experience: data.experience,
    workers: data.workers,
  }

  return new Promise((resolve, reject) => {
    Performer.findByIdAndUpdate(
      data.id,
      { $set: performerData },
      { new: true },
      function (err, updatedLocationType) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedLocationType)
        }
      },
    )
  })
}
