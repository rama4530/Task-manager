const express = require('express');
const router = express.Router();

const workspaceController = require('../controllers/WorkspaceController');
const authMiddleWare = require('../middleware/authMiddleware');
const validateMiddleWare = require('../middleware/validateId');

router.post('/', workspaceController.createWorkspace);
router.get('/:id', workspaceController.findWorkspaceById);
router.put('/:id', workspaceController.updateWorkspace);
router.delete('/:id', workspaceController.deleteWorkspace);

router.post('/:id/members/', workspaceController.addMemberToWorkspace);
router.delete('/:id/members/:userId', workspaceController.removeMemberFromWorkspace);
router.put('/:id/members/:userId/role', workspaceController.updateUserRole);
router.get('/:id/members', workspaceController.getAllmembers);

module.exports = router;