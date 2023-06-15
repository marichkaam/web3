const Customer = require('../models/model_customer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Customer.findByIdAndDelete(data.id, function (err, deletedCustomer) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedCustomer)
      }
    })
  })
}
