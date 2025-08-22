import style from "./item-list.module.css";
import { Link } from "react-router-dom";

export const ItemList = (props: { children?: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <ul className={style.list}>{props.children}</ul>
    </div>
  );
};

export const ItemListRow = (props: {
  to: string;
  name: string;
  date: string;
}) => {
  return (
    <li className={style.item}>
      <Link className={style.item_link} to={props.to}>
        <div className={style.item_name}>{props.name}</div>
        <div className={style.item_date}>
          {
            /**
             * TODO: Mostrar la fecha en formato "DD/MM/YYYY HH:mm"
             * Para esto se puede usar cualquier libreria de manejo de fechas
             */
            //props.date
            formatDateToDisplay(props.date)
          }
        </div>
      </Link>
    </li>
  );
};

//Función(es) en javascript puro para formatear fecha 
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

