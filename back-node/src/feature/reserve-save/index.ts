//import { reserveMemoryRepository } from "../../persistence/reserve/adapter/memory";
import { ReserveMysqlRepository } from "../../persistence/reserve/adapter/mysql/reserve-mysql-repository";
import { ReserveSave } from "./reserve-save";
import { ReserveSaveSpecificRes } from "./reserve-save"; 

/*
export const reserveSave = ReserveSave({
  reserveRepository: reserveMemoryRepository,
});
*/

const reserveRepository = new ReserveMysqlRepository();

/*
export const reserveSave = ReserveSave({
  reserveRepository,
});
*/

export const reserveSave = ReserveSaveSpecificRes({
  reserveRepository,
});