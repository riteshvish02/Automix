import { Request, Response } from 'express';

const getExample = (req: Request, res: Response) => {
  res.json({ message: 'Hello, World!' });
};

export default { getExample };
