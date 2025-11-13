import { useState } from "react";
import type { Book } from "../types";
import { API_URL } from "../api";

interface BookFormProps {
  onAdd: () => void;
}

function BookForm({ onAdd }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"Lido" | "Não lido">("Não lido");
  const [cover, setCover] = useState(""); 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newBook: Book = { title, author, status, cover };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    setTitle("");
    setAuthor("");
    setStatus("Não lido");
    setCover("");
    onAdd();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <br />

      <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
        <option value="Lido">Lido</option>
        <option value="Não lido">Não lido</option>
      </select>
      <br />

      <input
        type="text"
        placeholder="URL da capa"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />

      <button type="submit">Adicionar Livro</button>
    </form>
  );
}

export default BookForm;
