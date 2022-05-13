import express from "express";

import testRoutes from "./test.routes.js";
import bootcampRoutes from "./bootcamps.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/test", testRoutes);
router.use("/bootcamps", bootcampRoutes);
router.use("/user", userRoutes);

export default router;
