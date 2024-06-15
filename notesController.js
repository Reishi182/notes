import db from "./db.js";

const selectQuery = "SELECT * FROM notes";

export async function checkId(req, res, next) {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ status: "fail", message: "There is no id" });
  }

  try {
    const [notes] = await db.query(selectQuery);
    const checkNotesId = notes.some((note) => note.id === id);
    if (!checkNotesId) {
      return res.status(400).json({ status: "fail", message: "ID not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
  next();
}
export async function checkBody(req, res, next) {
  if (!req.body) {
    return res
      .status(400)
      .json({ status: "fail", message: "Update data can't be empty" });
  }
  next();
}
export async function getAllNotes(req, res) {
  try {
    const [notes] = await db.query(selectQuery);
    res.status(200).json({ status: "success", data: { notes } });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err.message });
  }
}

export async function createNotes(req, res) {
  try {
    await db.query(`INSERT INTO notes SET ?`, [req.body]);
    res
      .status(200)
      .json({ status: "success", message: "Successfully created a note" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}

export async function getNote(req, res) {
  const id = Number(req.params.id);
  try {
    const [note] = await db.query(`${selectQuery} WHERE id = ?`, [id]);
    if (!note) {
      return res
        .status(404)
        .json({ status: "fail", message: "Note not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Successful",
      data: { note: note[0] },
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}

export async function deleteNote(req, res) {
  const id = Number(req.params.id);
  try {
    await db.query(`DELETE FROM notes WHERE id = ?`, [id]);
    res
      .status(200)
      .json({ status: "success", message: "Successfully deleted a note" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}

export async function updateNote(req, res) {
  const id = Number(req.params.id);

  try {
    await db.query(`UPDATE notes SET ? WHERE id = ?`, [req.body, id]);
    res
      .status(200)
      .json({ status: "success", message: "Successfully updated the note" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}
