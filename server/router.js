const router = require("express").Router();
const controller = require("./controller");

router
  .route("/job-buddy")
  .get(controller.retrieveAll)
  .post(controller.createMany)
  .delete(controller.deleteAll);

module.exports = router;
