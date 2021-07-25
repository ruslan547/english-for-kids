import { Router } from 'express';
import logout from '../controllers/logout';
import pathsConstants from '../constants/paths';

const logoutRouter = Router();

logoutRouter.post(pathsConstants.ROOT, logout);

export default logoutRouter;
