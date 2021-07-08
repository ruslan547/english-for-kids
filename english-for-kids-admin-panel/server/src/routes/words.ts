import { Router } from 'express';
import { createWord, deleteWord } from '../controllers/words';
import pathsConstants from '../constants/paths';

const wordsRouter = Router();

// wordsRouter.get(pathsConstants.DEFAULT, getCategories);
wordsRouter.post(pathsConstants.DEFAULT, createWord);
// categoryRouter.patch(pathsConstants.DEFAULT, updateCategory);
wordsRouter.delete(pathsConstants.DEFAULT, deleteWord);

export default wordsRouter;
