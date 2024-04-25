import {Express, Request, Response} from 'express';
import express from 'express';
import * as path from 'path';
import sampleTodos from './data/sampleTodosLarge.json';
export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;

    this.app.use(express.static(path.resolve('./') + '/build/client'));

    this.app.get('/api', (req: Request, res: Response): void => {
      res.send('You have reached the API!');
    });

    this.app.get('/api/json', (req: Request, res: Response): void => {
      res.type('json');
      res.json(sampleTodos);
    });

    this.app.get('*', (req: Request, res: Response): void => {
      res.sendFile(path.resolve('./') + '/build/client/index.html');
    });
  }

  public start(port: number): void {
    this.app.listen(port, () =>
      console.log(`Server listening at http://localhost:${port}`),
    );
  }
}
