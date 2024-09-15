import express from 'express';
import login from './auth/login';
import createProject from './project/create';
import { getAllProject } from './project/getAllProjects';
import { saveCredential } from './project/saveCredential';
import { send } from './notification/send';
const router = express.Router();
router.use('/login', login);
router.post('/project',createProject)
router.get('/project',getAllProject)
router.post('/project/provider',saveCredential)
router.post('/notification/schedule',send)
export default router;