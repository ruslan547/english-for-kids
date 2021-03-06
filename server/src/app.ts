import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import createError from 'http-errors';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './routes';
import routesConstants from './constants/routes';
import loginRouter from './routes/login';
import registrationRouter from './routes/registration';
import { validateAuthParam } from './middleware/validate';
import logoutRouter from './routes/logout';
import categoryRouter from './routes/category';
import wordsRouter from './routes/words';
import openApiDocumentation from './openApiDocumentation.json';
import auth from './middleware/auth';

const app = express();
const loader = multer({ dest: path.join(__dirname, 'tmp') });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.use(routesConstants.REGISTRATION, validateAuthParam, registrationRouter);
app.use(routesConstants.LOGIN, validateAuthParam, loginRouter);
app.use(routesConstants.LOGOUT, logoutRouter);
app.use(routesConstants.CATEGORY, auth, categoryRouter);
app.use(routesConstants.WORDS, auth, loader.fields([{
  name: 'image', maxCount: 1,
}, {
  name: 'audio', maxCount: 1,
}]), wordsRouter);
app.use(routesConstants.INDEX, indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((error: createError.HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (!error.status) {
    next(error);
  }

  res.status(error.status ?? 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

export default app;
