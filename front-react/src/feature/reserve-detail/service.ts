import { Reserve } from "./types";

//export const service = {
//  async getReserveById(id: string): Promise<Reserve> {
    /**
     * TODO: Reemplazar por llamada a backend
     */
//    return {
//      id: id,
//     seats: [11, 12, 13],
//      event: {
//        name: "Event 1",
//        date: new Date().toISOString(),
//      },
//    };
//  },
//};

export const service = {
  async getReserveById(id: string): Promise<Reserve> {
    console.log("El id al momento de llamarlo desde el frontend es: ");
    console.log(id);
    const response = await fetch(`http://localhost:3000/reserve/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener la reserva ${id}: ${response.status}`);
    }
    const reserve = await response.json();
    return reserve as Reserve;
  },
};