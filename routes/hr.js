var express = require("express");
var router = express.Router();
//post a job
router.get("/form", function(req, res) {
    res.render("hr/form");
});

module.exports = router;