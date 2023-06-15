'use strict'

const express = require('express')
const router = express.Router()

const customerController = require('../controllers/customer')

router.get('/', customerController.index)
router.get('/list', customerController.customerList)
router.get('/add', customerController.createCustomerForm)
router.post('/add', customerController.postCreateCustomer)
router.get('/edit/:id', customerController.updateCustomerForm)
router.post('/edit/:id', customerController.putUpdateCustomer)
router.get('/remove/:id', customerController.deleteCustomerFrom)
router.post('/remove/:id', customerController.deleteCustomer)

module.exports = router
