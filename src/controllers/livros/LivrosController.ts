import {
  LivroRequest,
  type LivroRequestDTO,
} from "../../services/livros/Livros";

const livroRequest = new LivroRequest();

export default class LivrosController {
  public async criar(req: any, res: any): Promise<any> {
    const { title, author, quantity } = req.body as LivroRequestDTO;

    if (!title || !author || typeof quantity !== "number") {
      return res.status(400).json({
        error:
          "Os campos title, author e quantity são obrigatórios e quantity deve ser um número.",
      });
    }
    try {
      const livro = await livroRequest.criarLivro({
        title,
        author,
        quantity,
      });
      return res.status(201).json(livro);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar livro." });
    }
  }

  public async listar(req: any, res: any): Promise<any> {
    try {
      const livros = await livroRequest.listarLivros();
      return res.status(200).json(livros);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar livros." });
    }
  }

  public async deletar(req: any, res: any): Promise<any> {
    const { id } = req.params;
    try {
      await livroRequest.deletarLivro(id);
      return res.status(204).send();
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar livro." });
    }
  }

  public async atualizar(req: any, res: any): Promise<any> {
    const { id } = req.params;
    const { title, author, quantity } = req.body;
    try {
      const livro = await livroRequest.atualizarLivro(id, {
        title,
        author,
        quantity,
      });
      return res.status(200).json(livro);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar livro." });
    }
  }

  public async pesquisar(req: any, res: any): Promise<any> {
    const { id } = req.params;
    try {
      const livro = await livroRequest.pesquisarLivro(id);
      return res.status(200).json(livro);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao pesquisar livro." });
    }
  }
}
