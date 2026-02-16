import express from 'express';
import logger from './config/logger';
import { PORT } from './config/serverConfig';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
