'use strict'

const express = require('express')
const router = express.Router()

const performerController = require('../controllers/performer')

router.get('/', performerController.index)
router.get('/list', performerController.performerList)
router.get('/add', performerController.createPerformerForm)
router.post('/add', performerController.postCreatePerformer)
router.get('/edit/:id', performerController.updatePerformerForm)
router.post('/edit/:id', performerController.putUpdatePerformer)
router.get('/remove/:id', performerController.deletePerformerFrom)
router.post('/remove/:id', performerController.deletePerformer)

module.exports = router
