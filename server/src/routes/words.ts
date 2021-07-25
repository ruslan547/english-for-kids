import { Router } from 'express';
import {
  getCards, createCard, updateCard, deleteCard,
} from '../controllers/words';
import pathsConstants from '../constants/paths';

const wordsRouter = Router();

wordsRouter.get(pathsConstants.DEFAULT, getCards);
wordsRouter.post(pathsConstants.DEFAULT, createCard);
wordsRouter.patch(pathsConstants.DEFAULT, updateCard);
wordsRouter.delete(pathsConstants.DEFAULT, deleteCard);

export default wordsRouter;
