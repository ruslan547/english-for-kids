import { Router } from 'express';
import login from '../controllers/login';
import pathsConstants from '../constants/paths';

const loginRouter = Router();

loginRouter.post(pathsConstants.ROOT, login);

export default loginRouter;
