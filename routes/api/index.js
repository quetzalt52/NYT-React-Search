articlesconst router = require("express").Router();
const articleRoutes = require("./books");
// Book routes
router.use("/books", bookRoutes);
module.exports = router;
