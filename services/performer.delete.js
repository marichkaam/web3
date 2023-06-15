const Performer = require('../models/model_performer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Performer.findByIdAndDelete(data.id, function (err, deletedPerformer) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedPerformer)
      }
    })
  })
}
