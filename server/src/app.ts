import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import logger from './config/logger';
import { PORT } from './config/serverConfig';
import routes from './routes';
// import {ErrorHandler} from "./utils/ErrorHandler";
import {generatedError} from "./utils/error";


const app = express();

const allowedOrigins = (process.env.CLIENT_URLS || 'https://automix-vert.vercel.app')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowAll = allowedOrigins.includes('*');

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or curl
      if (allowAll) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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
