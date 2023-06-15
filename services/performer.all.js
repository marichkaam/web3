const Performer = require('../models/model_performer')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Performer.find()
      .exec(function (err, performers) {
        if (err) {
          reject(err)
        } else {
          resolve(performers)
        }
      })
  })
}
