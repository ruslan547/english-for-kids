import { Router } from 'express';
import {
  createCategory, deleteCategory, getCategories, updateCategory,
} from '../controllers/category';
import pathsConstants from '../constants/paths';
import auth from '../middleware/auth';

const categoryRouter = Router();

categoryRouter.get(pathsConstants.DEFAULT, getCategories);
categoryRouter.post(pathsConstants.DEFAULT, auth, createCategory);
categoryRouter.patch(pathsConstants.DEFAULT, updateCategory);
categoryRouter.delete(pathsConstants.DEFAULT, deleteCategory);

export default categoryRouter;
