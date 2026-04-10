import morgan from 'morgan';
import express from 'express';
import logger from './config/logger';
import { PORT } from './config/serverConfig';
import routes from './routes';
// import {ErrorHandler} from "./utils/ErrorHandler";
import {generatedError} from "./utils/error";


const app = express();
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
