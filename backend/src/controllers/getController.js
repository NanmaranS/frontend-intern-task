import Note from "../models/Note.js"

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId })
      .sort({ createdAt: -1 })

    res.json(notes)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}