import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import indexRouter from './routes';
import routesConstants from './constants/routes';
import loginRouter from './routes/login';
import registrationRouter from './routes/registration';
import { validateAuthParam } from './middleware/validate';
import logoutRouter from './routes/logout';
import categoryRouter from './routes/category';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use(routesConstants.REGISTRATION, validateAuthParam, registrationRouter);
app.use(routesConstants.LOGIN, validateAuthParam, loginRouter);
app.use(routesConstants.LOGOUT, logoutRouter);
app.use(routesConstants.CATEGORY, categoryRouter);
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

module.exports = app;
