import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { createNote } from "../controllers/createNote.js"
import {getSingleNote} from '../controllers/getSingleController.js'
import {getNotes} from '../controllers/getController.js'
import { updateNote } from "../controllers/updateController.js"
import {deleteNote} from '../controllers/deleteController.js'
const noteRoutes = express.Router()

noteRoutes.post("/", authMiddleware, createNote)
noteRoutes.get("/", authMiddleware, getNotes)
noteRoutes.get("/:id", authMiddleware, getSingleNote)
noteRoutes.put("/:id", authMiddleware, updateNote)
noteRoutes.delete("/:id", authMiddleware, deleteNote)

export default noteRoutes
