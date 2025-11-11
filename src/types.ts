export interface Book {
  id?: string;
  title: string;
  author: string;
  status: "Lido" | "Não lido";
  cover?: string; 
}
