import { Router } from 'express';
import v1routes from "./v1";
const router = Router();

router.use('/v1', v1routes);

export default router;
