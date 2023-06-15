const Customer = require('../models/model_customer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const customer = new Customer({
    name: data.name,
    budget: data.budget,
  })

  return new Promise((resolve, reject) => {
    customer.save(function (err, createdCustomer) {
      if (err) {
        reject(err)
      } else {
        resolve(createdCustomer)
      }
    })
  })
}
