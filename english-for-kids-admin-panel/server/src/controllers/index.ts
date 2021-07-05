import { Request, Response } from 'express';
// import path from 'path';

// const getIndexPage = (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
// };

const getIndexPage = (req: Request, res: Response) => {
  res.send('get');
};

export default getIndexPage;
