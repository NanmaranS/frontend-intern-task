import Note from "../models/Note.js"

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    res.json({ message: "Note deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}