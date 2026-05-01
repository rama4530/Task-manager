const express = require('express');
const router = express.Router();
const validateWorspace = require('../middleware/validateWorkspace')
const workspaceController = require('../controllers/WorkspaceController');
const authMiddleWare = require('../middleware/authMiddleware');
const validateId = require('../middleware/validateId');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', workspaceController.createWorkspace);
router.get('/:id',   validateId('id'), validateWorspace('id'), workspaceController.findWorkspaceById);
router.put('/:id',   validateId('id'), validateWorspace('id'), workspaceController.updateWorkspace);
router.delete('/:id',   validateId('id'), validateWorspace('id'), workspaceController.deleteWorkspace);

router.post('/:id/members/',   validateId('id'), validateWorspace('id'), workspaceController.addMemberToWorkspace);
router.delete('/:id/members/:userId',   validateId('id'), validateWorspace('id'), workspaceController.removeMemberFromWorkspace);
router.put('/:id/members/:userId/role',  validateId('id'), validate('userId'), validateWorspace('id'), workspaceController.updateUserRole);
router.get('/:id/members', validateId('id'), validateWorspace('id'), workspaceController.getAllmembers);

module.exports = router;