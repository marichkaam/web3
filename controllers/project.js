'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const projectListService = require('../services/project.all')
const projectCreateService = require('../services/project.create')
const projectUpdateService = require('../services/project.update')
const projectBuIdService = require('../services/project.byId')
const projectDeleteService = require('../services/project.delete')


function _getMockProject(id = null) {
  return {
    id: 666,
    name: '',
    address: 666,
    capacity: 666,
  }
}

module.exports = {
  index(req, res) {
    res.render('pages/project/index')
  },
  async projectList(req, res) {
    try {
      const projectList = await projectListService()
      res.render('pages/project/list', {
        projects: projectList,
      })
    } catch (error) {
      res.render('pages/project/list', {
        projects: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createProjectForm(req, res) {
    res.render('pages/project/add')
  },
  postCreateProject: [
    // body('name')
    //   .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    // body('sku')
    //   .isLength({ min: 1 }).trim().withMessage('Code field must be specified.'),
    // sanitizeBody('name').escape(),
    // sanitizeBody('sku').escape(),
    async (req, res) => {
      // const success = true
      const projectData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const project = await projectCreateService(projectData)
          req.flash('info', `Project "${project.name}" is Added`)
          res.redirect('/project/list')
        } catch (error) {
          res.render('pages/project/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/project/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updateProjectForm(req, res) {
    const entity = await projectBuIdService(req.params.id)

    res.render('pages/project/update', { project: entity })
  },
  async putUpdateProject(req, res) {
    const success = true
    const projectData = req.body
    const projectId = req.params.id
    const mockProject = _getMockProject(projectId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedProject = await projectUpdateService({
        ...projectData,
        id: projectId,
      })
      req.flash('info', `Project "#${projectId} ${projectData.name}" is Updated`)
      res.redirect('/project/list')
    } else {
      res.render('pages/project/update', {
        project: mockProject,
        newProject: projectData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deleteProjectFrom(req, res) {
    const entity = await projectBuIdService(req.params.id)

    // const mockProject = _getMockProject(req.params.id)
    res.render('pages/project/delete', { project: entity })
  },
  async deleteProject(req, res) {
    const success = true
    const projectData = req.body
    const projectId = req.params.id
    const mockProject = _getMockProject(projectId)

    if (success) {
      const deletedProject = await projectDeleteService({id: projectId})
      req.flash('info', `Project "#${projectId} ${mockProject.name}" is Deleted`)
      res.redirect('/project/list')
    } else {
      res.render('pages/project/delete', {
        project: mockProject,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
