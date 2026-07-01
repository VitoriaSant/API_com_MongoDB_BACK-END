import { ClienteRequest } from "../../services/clientes/Cliente";
import CCliente from "../../services/clientes/CCliente";

const clienteRequest = new ClienteRequest();

export default class ClienteController {
  public async criar(req: any, res: any): Promise<void> {
    const { name, email, status } = req.body as CCliente;

    if (!name || !email || typeof status !== "boolean") {
      return res.status(400).json({
        error:
          "Os campos name, email e status são obrigatórios e status deve ser booleano.",
      });
    }

    try {
      const cliente: CCliente = await clienteRequest.criarCliente({
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

  public async listar(req: any, res: any): Promise<void> {
    try {
      const clientes: CCliente[] = await clienteRequest.listarClientes();
      return res.status(200).json(clientes);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar clientes." });
    }
  }

  public async deletar(req: any, res: any): Promise<void> {
    const { id } = req.params;

    try {
      await clienteRequest.deletarCliente(id);
      return res.status(204).send();
    } catch (error: any) {
      console.error(error);

      // Tratamos o erro específico que criamos no Request
      if (error.message === "CLIENTE_COM_RESERVA_ATIVA") {
        res.status(400).json({
          error:
            "Não é possível excluir o cliente pois ele possui reservas pendentes ou livros em posse.",
        });
        return;
      }

      // Erro genérico caso aconteça qualquer outra coisa no banco
      res.status(500).json({ error: "Erro interno ao deletar cliente." });
      return;
    }
  }

  public async atualizar(req: any, res: any): Promise<void> {
    const { id } = req.params;
    const { name, email, status } = req.body as CCliente;

    try {
      const cliente: CCliente = await clienteRequest.atualizarCliente(id, {
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

  public async pesquisar(req: any, res: any): Promise<void> {
    const { id } = req.params;
    try {
      const cliente: CCliente | null =
        await clienteRequest.pesquisarCliente(id);
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
