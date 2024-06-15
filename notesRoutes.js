import express from "express";
import {
  checkBody,
  checkId,
  createNotes,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "./notesController.js";

const router = express();

router.param("id", checkId);

router.route("/").get(getAllNotes).post(checkBody, createNotes);

router
  .route("/:id")
  .get(getNote)
  .delete(deleteNote)
  .patch(checkBody, updateNote);

export default router;
