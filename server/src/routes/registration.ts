import { Router } from 'express';
import registration from '../controllers/registration';
import pathsConstants from '../constants/paths';

const registrationRouter = Router();

registrationRouter.post(pathsConstants.ROOT, registration);

export default registrationRouter;
