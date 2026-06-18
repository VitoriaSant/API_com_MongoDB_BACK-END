import prismaClient from "../../prisma";

type ClienteRequestDTO = {
  name: string;
  email: string;
  status: boolean;
};

class ClienteRequest {
  async criarCliente(data: ClienteRequestDTO): Promise<any> {
    return prismaClient.cliente.create({
      data,
    });
  }
  async listarClientes(): Promise<any> {
    return prismaClient.cliente.findMany();
  }
  async deletarCliente(id: string): Promise<any> {
    return prismaClient.cliente.delete({
      where: { id },
    });
  }

  async atualizarCliente(
    id: string,
    data: Partial<ClienteRequestDTO>,
  ): Promise<any> {
    return prismaClient.cliente.update({
      where: { id },
      data,
    });
  }
  async pesquisarCliente(id: string): Promise<any> {
    return prismaClient.cliente.findUnique({
      where: { id },
    });
  }
}

export { ClienteRequest, type ClienteRequestDTO };
