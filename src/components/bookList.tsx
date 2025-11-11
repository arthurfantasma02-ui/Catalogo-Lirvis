import { useEffect, useState } from "react";
import type { Book } from "../types";

import { API_URL } from "../api";

import BookForm from "./BookForm";



function BookList() {
  const [books, setBooks] = useState<Book[]>([]);


async function deleteBook(id: string) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    loadBooks();
  } catch (error) {
    console.error("Erro ao remover livro:", error);
  }
}



  async function loadBooks() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h2>Lista de Livros</h2>

        <BookForm onAdd={loadBooks} />

      {books.length === 0 && <p>Nenhum livro encontrado.</p>}

    <div className="book-grid">
  {books.map((book) => (
  <div  className="book-card"
    key={book.id}
    style={{
      background: "#ffffffff",
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center",
      color: "white",
    }}
  >
    <img
      src={book.cover || "https://via.placeholder.com/120x180?text=Sem+Capa"}
      alt={book.title}
      style={{
        width: "120px",
        height: "180px",
        objectFit: "cover",
        borderRadius: "5px",
        marginBottom: "8px",
      }}
    />

    <strong>{book.title}</strong>
    <p style={{ fontSize: "12px", opacity: 0.8 }}>{book.author}</p>

    <span
      style={{
        fontSize: "12px",
        padding: "2px 6px",
        borderRadius: "4px",
        background: book.status === "Lido" ? "#4caf50" : "#f44336",
        display: "inline-block",
        marginBottom: "8px",
      }}
    >
      {book.status}
    </span>

    <button
      onClick={() => deleteBook(book.id!)}
      style={{
        marginTop: "8px",
        background: "#ff5555",
        border: "none",
        padding: "6px 8px",
        borderRadius: "4px",
        cursor: "pointer",
        color: "white",
        fontSize: "12px",
      }}
    >
      Remover
    </button>
  </div>
))}

</div>

     
    </div>
  );
}

export default BookList;
