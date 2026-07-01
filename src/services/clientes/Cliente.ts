import prismaClient from "../../prisma";
import type CCliente from "./CCliente";

class ClienteRequest {
  async criarCliente(data: CCliente): Promise<CCliente> {
    const cliente = await prismaClient.cliente.create({ data });
    return cliente;
  }
  async listarClientes(): Promise<CCliente[]> {
    return prismaClient.cliente.findMany();
  }
  async deletarCliente(id: string): Promise<void> {
    const possuiReservaAtiva = await prismaClient.reserva.findFirst({
      where: {
        clienteId: id,
        status: {
          notIn: ["DEVOLVIDO", "CANCELADO"],
        },
      },
    });

    if (possuiReservaAtiva) {
      throw new Error("CLIENTE_COM_RESERVA_ATIVA");
    }

    await prismaClient.cliente.delete({
      where: { id },
    });
  }

  async atualizarCliente(
    id: string,
    data: Partial<CCliente>,
  ): Promise<CCliente> {
    const cliente = await prismaClient.cliente.update({
      where: { id },
      data,
    });
    return cliente;
  }
  async pesquisarCliente(id: string): Promise<CCliente | null> {
    return prismaClient.cliente.findUnique({
      where: { id },
    });
  }
}

export { ClienteRequest };
