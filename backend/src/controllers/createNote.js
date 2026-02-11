import Note from "../models/Note.js"

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" })
    }

    const note = await Note.create({
      title,
      content,
      user: req.userId
    })

    res.status(201).json(note)

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}