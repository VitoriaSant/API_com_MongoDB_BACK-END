export default class CReserva {
  clienteId: string;
  livroId: string;
  dataReserva: Date;
  dataRetirada: Date;
  status: string;
  dataDevolucao: Date | null;
  constructor(
    clienteId: string,
    livroId: string,
    dataReserva: Date,
    dataRetirada: Date,
    status: string,
    dataDevolucao: Date | null,
  ) {
    this.clienteId = clienteId;
    this.livroId = livroId;
    this.dataReserva = dataReserva;
    this.dataRetirada = dataRetirada;
    this.status = status;
    this.dataDevolucao = dataDevolucao;
  }
}
