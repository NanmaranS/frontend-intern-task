import Note from "../models/Note.js"
export const getSingleNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.json(note)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}