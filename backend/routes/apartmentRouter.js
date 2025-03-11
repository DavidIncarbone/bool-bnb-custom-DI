import express from "express";

const router = express.Router();

import {
  index,
  indexCategories,
  indexMostLovedHomePage,
  indexMostVisitedCityHomePage,
  indexLastTimeChanceHomePage,
  indexCategoriesHomePage,
  show,
  store,
  upload,
  storereviews,
  modify,
} from "../controllers/apartmentController.js";
//Rotte

// Index - Read all
router.get("/", index);
router.get("/categories", indexCategories)
router.get("/mostlovedhomepage", indexMostLovedHomePage);
router.get("/mostvisitedcityhomepage", indexMostVisitedCityHomePage);
router.get("/lasttimechancehomepage", indexLastTimeChanceHomePage);
router.get("/categorieshomepage", indexCategoriesHomePage);

// Show - Read one -
router.get("/:slug", show);

//Store - Create
router.post("/", upload.single("file"), store);

// Store - Create review
router.post("/:slug/reviews", storereviews);

//Update - Update  totale
router.patch("/:slug", modify);


//export router
export default router;
