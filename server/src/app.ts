import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import logger from './config/logger';
import { PORT } from './config/serverConfig';
import routes from './routes';
// import {ErrorHandler} from "./utils/ErrorHandler";
import {generatedError} from "./utils/error";


import { initializeQdrantCollections } from './rag/clients/qdrantClient';
import { setupNeo4jSchema } from './rag/clients/neo4jClient';

const app = express();

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4000',
  'https://automix-vert.vercel.app',
];

const configuredOrigins = (process.env.CORS_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];
const allowAll = allowedOrigins.includes('*') || process.env.NODE_ENV !== 'production';

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or curl
      if (allowAll) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin === 'https://automix-vert.vercel.app' ||
        origin.endsWith('.vercel.app')
      ) {
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

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  
  // Safely warm up and initialize RAG stores in background
  initializeQdrantCollections().catch((err) => {
    logger.warn(`Qdrant initialization note: ${err.message || err}`);
  });
  setupNeo4jSchema().catch((err) => {
    logger.warn(`Neo4j initialization note: ${err.message || err}`);
  });
});

export default app;
