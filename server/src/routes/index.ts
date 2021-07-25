import express from 'express';
import getIndexPage from '../controllers/index';
import pathsConstants from '../constants/paths';

const indexRouter = express.Router();

indexRouter.get(pathsConstants.ROOT, getIndexPage);

export default indexRouter;
