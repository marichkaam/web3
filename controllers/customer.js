'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const customerListService = require('../services/customer.all')
const customerCreateService = require('../services/customer.create')
const customerUpdateService = require('../services/customer.update')
const customerBuIdService = require('../services/customer.byId')
const customerDeleteService = require('../services/customer.delete')

function _getMockCustomer(id = null) {
  return {
    id: 666,
    name: '',
    budget: 666,
  }
}

module.exports = {
  index(req, res) {
    res.render('pages/customer/index')
  },
  async customerList(req, res) {
    try {
      const customerList = await customerListService()
      res.render('pages/customer/list', {
        customers: customerList,
      })
    } catch (error) {
      res.render('pages/customer/list', {
        customers: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createCustomerForm(req, res) {
    res.render('pages/customer/add')
  },
  postCreateCustomer: [
    async (req, res) => {
      // const success = true
      const customerData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const customer = await customerCreateService(customerData)
          req.flash('info', `Customer "${customer.name}" is Added`)
          res.redirect('/customer/list')
        } catch (error) {
          res.render('pages/customer/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/customer/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updateCustomerForm(req, res) {
    const entity = await customerBuIdService(req.params.id)

    res.render('pages/customer/update', { customer: entity })
  },
  async putUpdateCustomer(req, res) {
    const success = true
    const customerData = req.body
    const customerId = req.params.id
    const mockCustomer = _getMockCustomer(customerId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedCustomer = await customerUpdateService({
        ...customerData,
        id: customerId,
      })
      req.flash('info', `Customer "#${customerId} ${customerData.name}" is Updated`)
      res.redirect('/customer/list')
    } else {
      res.render('pages/customer/update', {
        customer: mockCustomer,
        newCustomer: customerData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deleteCustomerFrom(req, res) {
    const entity = await customerBuIdService(req.params.id)

    // const mockCustomer = _getMockCustomer(req.params.id)
    res.render('pages/customer/delete', { customer: entity })
  },
  async deleteCustomer(req, res) {
    const success = true
    const customerData = req.body
    const customerId = req.params.id
    const mockCustomer = _getMockCustomer(customerId)

    if (success) {
      const deletedCustomer = await customerDeleteService({ id: customerId })
      req.flash('info', `Customer "#${customerId} ${mockCustomer.name}" is Deleted`)
      res.redirect('/customer/list')
    } else {
      res.render('pages/customer/delete', {
        customer: mockCustomer,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
