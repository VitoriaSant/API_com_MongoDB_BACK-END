import prismaClient from "../../prisma";
import type CCliente from "../../controllers/clientes/CCliente";

type ClienteRequestDTO = {
  name: string;
  email: string;
  status: boolean;
};

class ClienteRequest {
  async criarCliente(data: ClienteRequestDTO): Promise<CCliente> {
    return prismaClient.cliente.create({
      data,
    });
  }
  async listarClientes(): Promise<CCliente[]> {
    return prismaClient.cliente.findMany();
  }
  async deletarCliente(id: string): Promise<CCliente> {
    return prismaClient.cliente.delete({
      where: { id },
    });
  }

  async atualizarCliente(
    id: string,
    data: Partial<ClienteRequestDTO>,
  ): Promise<CCliente> {
    return prismaClient.cliente.update({
      where: { id },
      data,
    });
  }
  async pesquisarCliente(id: string): Promise<CCliente | null> {
    return prismaClient.cliente.findUnique({
      where: { id },
    });
  }
}

export { ClienteRequest, type ClienteRequestDTO };
