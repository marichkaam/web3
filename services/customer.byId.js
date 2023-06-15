const Customer = require('../models/model_customer')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    Customer.findById(id, function (err, customer) {
      if (err) {
        reject(err)
      } else {
        resolve(customer)
      }
    })
  })
}
