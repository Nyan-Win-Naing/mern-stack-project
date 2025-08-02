const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const router = express.Router();

// get all recipes
router.get("" ,RecipeController.index);
// post update single recipe
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("ingredients").notEmpty().isArray({ min: 3 }),
  ],
  handleErrorMessage,
  RecipeController.store
);
// get single recipe
router.get("/:id", RecipeController.show);
// delete single recipe
router.delete("/:id", RecipeController.destroy);
// patch update single recipe
router.patch("/:id", RecipeController.update);

module.exports = router;
