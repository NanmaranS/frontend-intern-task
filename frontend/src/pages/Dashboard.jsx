import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../index.css"

export default function Dashboard() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const fetchNotes = async () => {
    if (!token) return
    const res = await axios.get("http://localhost:5000/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    })
    setNotes(res.data)
  }

  useEffect(() => {
    if (!token) navigate("/")
    fetchNotes()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTitle("")
      setContent("")
      fetchNotes()
    } catch (err) {
      alert(err.response?.data || "Failed to add note")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchNotes()
    } catch (err) {
      alert(err.response?.data || "Failed to delete note")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "600px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Dashboard</h2>
          <button
            onClick={logout}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#e84118",
              color: "#fff",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c23616")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e84118")}
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleCreate}
          style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="auth-input"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="auth-input"
            rows="4"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Note"}
          </button>
        </form>

        {notes.length === 0 && <p style={{ textAlign: "center", color: "#718093" }}>No notes yet.</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {notes.map((note) => (
            <div
              key={note._id}
              style={{
                padding: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                backgroundColor: "#f8f9fa",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 8px 0" }}>{note.title}</h4>
                <p style={{ margin: 0, color: "#2f3640" }}>{note.content}</p>
              </div>
              <button
                onClick={() => handleDelete(note._id)}
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  fontSize: "13px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#e84118",
                  color: "#fff",
                  cursor: "pointer",
                  alignSelf: "flex-end",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c23616")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e84118")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
