import * as path from 'path';
import express, {Request, Response} from 'express';
import sampleTodos from '../data/sampleTodos.json';

const router = express.Router();

router.get('/api/sample-json', (req: Request, res: Response): void => {
  try {
    res.type('json');
    res.status(200);
    if (req.query.size === 'large') {
      res.json(sampleTodos);
    } else {
      res.json(sampleTodos.slice(0, 10));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.use(function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

export default router;
