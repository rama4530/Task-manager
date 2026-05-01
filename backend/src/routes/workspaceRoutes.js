const express = require('express');
const router = express.Router();
const validateWorspace = require('../middleware/validateWorkspace')
const workspaceController = require('../controllers/WorkspaceController');
const authMiddleWare = require('../middleware/authMiddleware');
const validateId = require('../middleware/validateId');

router.post('/', workspaceController.createWorkspace);
router.get('/:id', validateWorspace(id), validateId(id), workspaceController.findWorkspaceById);
router.put('/:id', validateWorspace(id), validateId(id), workspaceController.updateWorkspace);
router.delete('/:id', validateWorspace(id), validateId(id),  workspaceController.deleteWorkspace);

router.post('/:id/members/', validateWorspace(id), validateId(id), workspaceController.addMemberToWorkspace);
router.delete('/:id/members/:userId', validateWorspace(id), validateId(id), workspaceController.removeMemberFromWorkspace);
router.put('/:id/members/:userId/role', validateWorspace(id), validateId(id), workspaceController.updateUserRole);
router.get('/:id/members', validateWorspace(id), validateId(id), workspaceController.getAllmembers);

module.exports = router;