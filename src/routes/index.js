const { Router } = require("express");
const router = Router();

// Main route
router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;
