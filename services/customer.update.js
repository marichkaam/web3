const Customer = require('../models/model_customer')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const customerData = {
    name: data.name,
    budget: data.budget,
    
  }

  return new Promise((resolve, reject) => {
    Customer.findByIdAndUpdate(
      data.id,
      { $set: customerData },
      { new: true },
      function (err, updatedLocationType) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedLocationType)
        }
      })
  })
}
