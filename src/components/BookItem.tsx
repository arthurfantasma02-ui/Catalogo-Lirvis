import type { Book } from "../types";
import { API_URL } from "../api";

interface BookItemProps {
  book: Book;
  onDelete: () => void;
}

function BookItem({ book, onDelete }: BookItemProps) {
  async function handleDelete() {
    await fetch(`${API_URL}/${book._id}`, {
      method: "DELETE",
    });

    onDelete();
  }

  return (
    <li style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 12 }}>
      <img src={book.cover} alt={book.title} style={{ width: 60, height: 90, objectFit: "cover", borderRadius: 6 }} />
      <div>
        <strong>{book.title}</strong> — {book.author} <br />
        <small>{book.status}</small>
      </div>

      <button onClick={handleDelete} style={{ marginTop: 8, background: "#ff5555", color: "white" }}>
        Remover
      </button>
    </li>
  );
}




export default BookItem;
