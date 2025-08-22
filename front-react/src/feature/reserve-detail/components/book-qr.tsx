import style from "./book-qr.module.css";
import { QRCodeSVG } from "qrcode.react"; //para el código QR

//export const BookQR = () => {
//  return (
//    <div className={style.container}>{
      /**
       * TODO: Reemplazar el texto por un QR generado a partir del bookingId
       * Para eso se debe recibir el bookingId como prop del componente
       * y utilizar una libreria que genere QRs
       */
//      `QR`
//    }</div>
//  );
//};

export const BookQR = (props: { bookingId: string }) => {
  return (
    <div className={style.container}>
      <QRCodeSVG
        value={props.bookingId}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="L"
        title="Código QR de reserva"
      />
    </div>
  );
};
