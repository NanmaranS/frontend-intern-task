import Note from "../models/Note.js"

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body

    const note = await Note.findOne({
      _id: req.params.id,
      user: req.userId
    })

    if (!note) {
      return res.status(404).json({ message: "Note not found" })
    }

    note.title = title || note.title
    note.content = content || note.content

    await note.save()

    res.json(note)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}