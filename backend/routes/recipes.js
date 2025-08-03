const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const upload = require("../helpers/upload");
const router = express.Router();

// get all recipes
router.get("", RecipeController.index);
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
router.post(
  "/:id/upload",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      
      if (!req.file) {
        throw new Error("Photo is required");
      }

      if(!req.file.mimetype.startsWith("image")) {
        throw new Error("Photo must be image");
      } 

      return true;
    }),
  ],
  handleErrorMessage,
  RecipeController.upload
);
// delete single recipe
router.delete("/:id", RecipeController.destroy);
// patch update single recipe
router.patch("/:id", RecipeController.update);

module.exports = router;
