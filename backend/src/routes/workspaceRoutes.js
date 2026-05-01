const express = require('express');
const router = express.Router();

const workspaceController = require('../controllers/WorkspaceController');
const authMiddleWare = require('../middleware/authMiddleware');
const validateMiddleWare = require('../middleware/validateId');

router.post('/create-workspace', workspaceController.createWorkspace);
router.get('/:id', workspaceController.findWorkspaceById);
router.put('/:id', workspaceController.updateWorkspace);
router.delete('/:id', workspaceController.deleteWorkspace);
router.post('/add-member', workspaceController.addMemberToWorkspace);
router.delete('/', workspaceController.removeMemberFromWorkspace);
router.put('/update-member-role', workspaceController.updateUserRole);
router.get('/:id', workspaceController.getAllmembers);