import prismaClient from "../../prisma";
import type CReserva from "./CReserva";

class ReservaRequest {
    async criarReserva(data: CReserva): Promise<CReserva> {
        return prismaClient.reserva.create({
            data,
        });
    }
    async listarReservas(): Promise<CReserva[]> {
        return prismaClient.reserva.findMany();
    }

    async deletarReserva(id: string): Promise<any> {
        return prismaClient.reserva.delete({
            where: { id },
        });
    }
    async atualizarReserva(id: string, data: Partial<CReserva>): Promise<CReserva> {
        return prismaClient.reserva.update({
            where: { id },  
            data,
        });
    }
    async pesquisarReserva(id: string): Promise<CReserva | null> {
        return prismaClient.reserva.findUnique({
            where: { id },
        });
    }
}
export { ReservaRequest };