const Performer = require('../models/model_performer')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    Performer.findById(id, function (err, performer) {
      if (err) {
        reject(err)
      } else {
        resolve(performer)
      }
    })
  })
}
