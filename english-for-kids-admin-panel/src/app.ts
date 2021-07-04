import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import createError from 'http-errors';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
  res.send('ok');
});

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
