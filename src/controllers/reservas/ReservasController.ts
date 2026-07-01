import { ReservaRequest } from "../../services/reserva/Reserva";
import CReserva from "../../services/reserva/CReserva";

const reservaRequest = new ReservaRequest();

export default class ReservasController {
  public async criar(req: any, res: any): Promise<void> {
    const {
      clienteId,
      livroId,
      dataReserva,
      dataRetirada,
      status,
      dataDevolucao,
    } = req.body as CReserva;

    if (!clienteId || !livroId || !dataReserva || !dataRetirada || !status) {
      return res.status(400).json({
        error:
          "Os campos clienteId, livroId, dataReserva, dataRetirada e status são obrigatórios.",
      });
    }
    try {
      const reserva: CReserva = await reservaRequest.criarReserva({
        clienteId,
        livroId,
        dataReserva,
        dataRetirada,
        status,
        dataDevolucao,
      });
      res.status(201).json(reserva);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar reserva." });
    }
  }

  public async listar(req: any, res: any): Promise<void> {
    try {
      const reservas: CReserva[] = await reservaRequest.listarReservas();
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar reservas." });
    }
  }

  public async deletar(req: any, res: any): Promise<void> {
    const { id } = req.params;
    try {
      await reservaRequest.deletarReserva(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar reserva." });
    }
  }
  public async atualizar(req: any, res: any): Promise<void> {
    const { id } = req.params;
    const data = req.body;

    try {
      const reserva: CReserva | null =
        await reservaRequest.pesquisarReserva(id);

      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      const reservaAtualizada: CReserva = await reservaRequest.atualizarReserva(
        id,
        data,
      );
      res.status(200).json(reservaAtualizada);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar reserva." });
    }
  }
  public async pesquisar(req: any, res: any): Promise<void> {
    const { id } = req.params;
    try {
      const reserva = await reservaRequest.pesquisarReserva(id);
      return res.status(200).json(reserva);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao pesquisar reserva." });
    }
  }
}
