import express, {Express} from 'express';
import cors from 'cors';
import * as path from 'path';
import routes from './routes';

const port = 8080;

const app: Express = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve('./') + '/build/client'));

app.use(routes);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`),
);
