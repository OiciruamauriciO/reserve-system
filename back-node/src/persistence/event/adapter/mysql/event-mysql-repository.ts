import { db } from "../../../../db";
import { EventEntity } from "../../event-entity";
import { EventRepository } from "../../event-repository";

export class EventMysqlRepository implements EventRepository {
  async findAll(): Promise<EventEntity[]> {
    const [rows] = await db.query(
      `SELECT id, name, date FROM events`
    );

    return (rows as any[]).map(row => ({
      id: row.id,
      name: row.name,
      date: row.date,
      price: row.price
    }));
  }

  async findById(id: string): Promise<EventEntity | null> {
    const [rows] = await db.query(
      `SELECT id, name, date FROM events WHERE id = ?`,
      [id]
    );

    const data = rows as any[];

    if (data.length === 0) return null;

    return {
      id: data[0].id,
      name: data[0].name,
      date: data[0].date,
      price: data[0].price
    };
  }
}
