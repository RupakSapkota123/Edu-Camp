import { testService } from "../services/index.js";

const testControllers = async (req, res) => {
  try {
    const body = await testService.testService("test success");
    res.json(body);
  } catch (err) {
    res.json(err);
  }
};

export default {
  testControllers,
};
