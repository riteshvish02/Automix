import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import logger from './config/logger';
import { PORT } from './config/serverConfig';
import routes from './routes';
// import {ErrorHandler} from "./utils/ErrorHandler";
import {generatedError} from "./utils/error";


const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);


// app.all("*", (req, res, next) => {
//   next(new ErrorHandler(`Requested URL NOT Found`, 404));
// });
app.use(generatedError)

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
