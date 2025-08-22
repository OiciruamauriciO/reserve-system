import { Event } from "./types";

//export const service = {
//  getEvents: async (): Promise<Event[]> => {
    /**
     * TODO: Reemplazar por llamada a backend
     */

//    return [
//      {
//        id: "1",
//        name: "Event 1",
//        date: new Date().toISOString(),
//      },
//      {
//        id: "2",
//        name: "Event 2",
//        date: new Date().toISOString(),
//      },
//      {
//        id: "3",
//       name: "Event 3",
//        date: new Date().toISOString(),
//      },
//    ];
//  },
//};

export const service = {
  async getEvents(): Promise<Event[]> {
    const response = await fetch("http://localhost:3000/events");
    if (!response.ok) {
      throw new Error(`Error al obtener eventos: ${response.status}`);
    }
    const events = await response.json();
    return events as Event[];
  },
};
