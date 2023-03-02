import express from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/error.handler';
import tableRoute from './routes/tables'
// const { userRoute } = require('./routes/user');

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.app.use(express.json());
    // this.app.use('/users', userRoute);
    this.app.use('/tables', tableRoute);
    this.app.use(ErrorHandler.handle);
  }

  startServer(PORT: string | number) {
    this.app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`))
  }
}

export default App