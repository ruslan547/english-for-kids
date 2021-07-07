import { Router } from 'express';
import {
  createCategory, deleteCategory, getCategories, updateCategory,
} from '../controllers/category';
import pathsConstants from '../constants/paths';

const categoryRouter = Router();

categoryRouter.get(pathsConstants.DEFAULT, getCategories);
categoryRouter.post(pathsConstants.DEFAULT, createCategory);
categoryRouter.patch(pathsConstants.DEFAULT, updateCategory);
categoryRouter.delete(pathsConstants.DEFAULT, deleteCategory);

export default categoryRouter;
