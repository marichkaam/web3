'use strict'

const express = require('express')
const router = express.Router()

const projectController = require('../controllers/project')

router.get('/', projectController.index)
router.get('/list', projectController.projectList)
router.get('/add', projectController.createProjectForm)
router.post('/add', projectController.postCreateProject)
router.get('/edit/:id', projectController.updateProjectForm)
router.post('/edit/:id', projectController.putUpdateProject)
router.get('/remove/:id', projectController.deleteProjectFrom)
router.post('/remove/:id', projectController.deleteProject)

module.exports = router
