import { Event } from "./types";

export const service = {
  //async getEventById(id: string): Promise<Event> {
    /**
     * TODO: Reemplazar por llamada a backend
     */
  //  return {
  //    id: id,
  //    name: `Event ${id}`,
  //   date: new Date().toISOString(),
  //    price: 100,
  //    reservedSeats: [2, 3, 12, 13, 22, 23, 26, 27],
  //  };
  //},

  async getEventById(id: string): Promise<Event> {
    const response = await fetch(`http://localhost:3000/events/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener evento ${id}: ${response.status}`);
    }
    const event = await response.json();
    return event;
  },

  //async book(props: {
  //  eventId: string;
  //  selectedSeats: number[];
  //}): Promise<{ reserveId: string }> {
    /**
     * TODO: Reemplazar por llamada a backend
     */
  //  console.log("book", props);
  // return { reserveId: "f9zL5w" };
 //},
  async book(props: { eventId: string; selectedSeats: number[]; }): Promise<{ reserveId: string }> {
    console.log('Datos para reservar:', props);
    const response = await fetch(`http://localhost:3000/reserve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: props.eventId,
        seats: props.selectedSeats,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error al reservar asientos: ${response.status}`);
    }
    const result = await response.json();
    console.log("El resultado en el book async es");
    console.log(result);
    return result;
  }
 
};
