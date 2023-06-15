const Customer = require('../models/model_customer')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Customer.find()
      .exec(function (err, customers) {
        if (err) {
          reject(err)
        } else {
          resolve(customers)
        }
      })
  })
}
