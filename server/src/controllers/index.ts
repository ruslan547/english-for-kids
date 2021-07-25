import { Request, Response } from 'express';

const getIndexPage = (req: Request, res: Response) => {
  res.json({ message: 'efk' });
};

export default getIndexPage;
