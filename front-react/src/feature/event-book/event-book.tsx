import style from "./event-book.module.css";
import { Layout } from "../../components/layout";
import { BookButton, SeatList, SeatListItem, Screen } from "./components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Event } from "./types";
import { service } from "./service";
import { TailSpin } from "react-loader-spinner"; // spinner

// Funciones para formatear la fecha
function pad(num: number) {
  return num.toString().padStart(2, "0");
}

function formatDateToDisplay(dateString: string): string {
  const date = new Date(dateString);
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const EventBook = () => {
  const maxSeats = 32;
  const navigate = useNavigate();
  const { eventId } = useParams<"eventId">();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    if (!eventId) {
      return;
    }

    service.getEventById(eventId).then((event) => {
      setEvent(event);
    });
  }, [eventId]);

  const toggleSeat = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prev) => prev.filter((num) => num !== seatNumber));
    } else {
      if (selectedSeats.length >= 4) return; // máximo 4 asientos
      setSelectedSeats((prev) => [...prev, seatNumber]);
    }
  };

  const submit = () => {
    if (!eventId) {
      return;
    }

    const mappedEventId = `evt${eventId}`;
    console.log('Event Id:', eventId);
    console.log('Event Id evt:', `evt${eventId}`);
    console.log('Event Id mappedEventId:', mappedEventId);

    service
      .book({
        eventId: mappedEventId,
        //selectedSeats: [],  TODO: Enviar asientos seleccionados a reservar
        selectedSeats: selectedSeats,
      })
      .then((response) => {
        const reserveId = response.reserveId;
        console.log("Reserva creada con id:", reserveId);
        navigate(`/reserve/${reserveId}`);
      });
  };

  const computeAmount = () => {
    //TODO: Calcular el monto total de los asientos seleccionados
    //return 0;
    return selectedSeats.length * 1000; 
  };

  if (!event) {
    //TODO: Mostrar un spinner mientras se carga el evento
    //return null;
    return (
      <div className={style.loader}>
        <TailSpin color="#000" height={80} width={80} />
      </div>
    );    
  }

  return (
    <Layout>
      <Link className={style.back} to="..">
        Atrás
      </Link>

      <h1 className={style.title}>{event.name}</h1>

      <p className={style.date}>{formatDateToDisplay(event.date)}</p>
      {/**
         * <p className={style.date}> por <p className={style.date}>{formatDateToDisplay(event.date)}</p>
         * TODO: Mostrar la fecha en formato "DD/MM/YYYY HH:mm"
         * Para esto se puede usar cualquier libreria de manejo de fechas
         */}
      <Screen/>
      <SeatList>
        {Array.from({ length: maxSeats }, (_, idx) => idx + 1).map((number) => {
          /**
           * TODO: Agregar logica para marcar y desmarcar los asientos a reservar
           * Para esto se debe agregar o quitar la propiedad isSelected al componente SeatListItem
           * creando un estado que guarde los asientos seleccionados usando el evento onClick
           * del componente SeatListItem
           */
          /**
           * TODO: Agregar regla comercial de que solo se pueden
           * seleccionar máximo 4 asientos por reserva
           *
           * const isReserved = event.reservedSeats.indexOf(number) !== -1; por const isReserved = event.reservedSeats.includes(number);
           */
          const isReserved = event.reservedSeats.includes(number);
          return (
            <SeatListItem
              key={number}
              number={number}
              isReserved={isReserved}
              isSelected={selectedSeats.includes(number)} //nuevo
              onClick={toggleSeat} //nuevo
            />
          );
        })}
      </SeatList>
      <BookButton amount={computeAmount().toString()} onClick={submit}/>
    </Layout>
  );
};
