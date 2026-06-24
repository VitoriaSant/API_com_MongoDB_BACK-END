import {
  ClienteRequest,
  type ClienteRequestDTO,
} from "../../services/clientes/Cliente";
import CCliente from "./CCliente";

const clienteRequest = new ClienteRequest();

export default class ClienteController {
  public async criar(req: any, res: any): Promise<CCliente> {
    const { name, email, status } = req.body as ClienteRequestDTO;

    if (!name || !email || typeof status !== "boolean") {
      return res.status(400).json({
        error:
          "Os campos name, email e status são obrigatórios e status deve ser booleano.",
      });
    }

    try {
      const cliente = await clienteRequest.criarCliente({
        name,
        email,
        status,
      });
      return res.status(201).json(cliente);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar cliente." });
    }
  }

  public async listar(req: any, res: any): Promise<CCliente[]> {
    try {
      const clientes = await clienteRequest.listarClientes();
      return res.status(200).json(clientes);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar clientes." });
    }
  }

  public async deletar(req: any, res: any): Promise<CCliente> {
    const { id } = req.params;
    try {
      await clienteRequest.deletarCliente(id);
      return res.status(204).send();
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar cliente." });
    }
  }

  public async atualizar(req: any, res: any): Promise<CCliente> {
    const { id } = req.params;
    const { name, email, status } = req.body;

    try {
      const cliente = await clienteRequest.atualizarCliente(id, {
        name,
        email,
        status,
      });
      return res.status(200).json(cliente);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar cliente." });
    }
  }

  public async pesquisar(req: any, res: any): Promise<CCliente | null> {
    const { id } = req.params;
    try {
      const cliente = await clienteRequest.pesquisarCliente(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      } else {
        return res.status(200).json(cliente);
      }
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao pesquisar cliente." });
    }
  }
}
