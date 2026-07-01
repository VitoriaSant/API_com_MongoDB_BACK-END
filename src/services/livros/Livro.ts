import prismaClient from "../../prisma";
import type CLivro from "./CLivro";

class LivroRequest {
  async criarLivro(data: CLivro): Promise<CLivro> {
    return prismaClient.livro.create({
      data,
    });
  }
  async listarLivros(): Promise<CLivro[]> {
    return prismaClient.livro.findMany();
  }
  async deletarLivro(id: string): Promise<any> {
    const possuiReservaAtiva = await prismaClient.reserva.findFirst({
      where: {
        livroId: id,
        status: {
          notIn: ["DEVOLVIDO", "CANCELADO"],
        },
      },
    });

    if (possuiReservaAtiva) {
      throw new Error("LIVRO_COM_RESERVA_ATIVA");
    }

    return prismaClient.livro.delete({
      where: { id },
    });
  }
  async atualizarLivro(id: string, data: Partial<CLivro>): Promise<CLivro> {
    return prismaClient.livro.update({
      where: { id },
      data,
    });
  }
  async pesquisarLivro(id: string): Promise<CLivro | null> {
    return prismaClient.livro.findUnique({
      where: { id },
    });
  }
}

export { LivroRequest };
