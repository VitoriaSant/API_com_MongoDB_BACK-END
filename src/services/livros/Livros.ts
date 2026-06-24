import prismaClient from "../../prisma";

type LivroRequestDTO = {
  title: string;
  author: string;
  quantity: number;
};

class LivroRequest {
  async criarLivro(data: LivroRequestDTO): Promise<any> {
    return prismaClient.livro.create({
      data,
    });
  }
  async listarLivros(): Promise<any> {
    return prismaClient.livro.findMany();
  }
  async deletarLivro(id: string): Promise<any> {
    return prismaClient.livro.delete({
      where: { id },
    });
  }
  async atualizarLivro(
    id: string,
    data: Partial<LivroRequestDTO>,
  ): Promise<any> {
    return prismaClient.livro.update({
      where: { id },
      data,
    });
  }
  async pesquisarLivro(id: string): Promise<any> {
    return prismaClient.livro.findUnique({
      where: { id },
    });
  }
}

export { LivroRequest, type LivroRequestDTO };
