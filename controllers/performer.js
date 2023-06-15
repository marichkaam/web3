'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const performerListService = require('../services/performer.all')
const performerCreateService = require('../services/performer.create')
const performerUpdateService = require('../services/performer.update')
const performerBuIdService = require('../services/performer.byId')
const performerDeleteService = require('../services/performer.delete')



function _getMockPerformer(id = null) {
  return {
    id: 666,
    name: '',
    address: 666,
    capacity: 666,
  }
}

module.exports = {
  index(req, res) {
    res.render('pages/performer/index')
  },
  async performerList(req, res) {
    try {
      const performerList = await performerListService()
      res.render('pages/performer/list', {
        performers: performerList,
      })
    } catch (error) {
      res.render('pages/performer/list', {
        performers: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createPerformerForm(req, res) {
    res.render('pages/performer/add')
  },
  postCreatePerformer: [
    // body('name')
    //   .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    // body('sku')
    //   .isLength({ min: 1 }).trim().withMessage('Code field must be specified.'),
    // sanitizeBody('name').escape(),
    // sanitizeBody('sku').escape(),
    async (req, res) => {
      // const success = true
      const performerData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const performer = await performerCreateService(performerData)
          req.flash('info', `Performer "${performer.name}" is Added`)
          res.redirect('/performer/list')
        } catch (error) {
          res.render('pages/performer/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/performer/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updatePerformerForm(req, res) {
    const entity = await performerBuIdService(req.params.id)

    res.render('pages/performer/update', { performer: entity })
  },
  async putUpdatePerformer(req, res) {
    const success = true
    const performerData = req.body
    const performerId = req.params.id
    const mockPerformer = _getMockPerformer(performerId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedPerformer = await performerUpdateService({
        ...performerData,
        id: performerId,
      })
      req.flash('info', `Performer "#${performerId} ${performerData.name}" is Updated`)
      res.redirect('/performer/list')
    } else {
      res.render('pages/performer/update', {
        performer: mockPerformer,
        newPerformer: performerData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deletePerformerFrom(req, res) {
    const entity = await performerBuIdService(req.params.id)

    // const mockPerformer = _getMockPerformer(req.params.id)
    res.render('pages/performer/delete', { performer: entity })
  },
  async deletePerformer(req, res) {
    const success = true
    const performerData = req.body
    const performerId = req.params.id
    const mockPerformer = _getMockPerformer(performerId)

    if (success) {
      const deletedPerformer = await performerDeleteService({id: performerId})
      req.flash('info', `Performer "#${performerId} ${mockPerformer.name}" is Deleted`)
      res.redirect('/performer/list')
    } else {
      res.render('pages/performer/delete', {
        performer: mockPerformer,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
