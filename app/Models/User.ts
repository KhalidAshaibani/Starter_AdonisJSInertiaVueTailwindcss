import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  beforeSave,
} from "@ioc:Adonis/Lucid/Orm";
import { softDelete, softDeleteQuery } from "../Services/SoftDelete";
import Hash from "@ioc:Adonis/Core/Hash";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public username: string;

  @column()
  public password: string;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Hash Password
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  // Soft Delete
  @beforeFind()
  public static softDeletesFind = softDeleteQuery;
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery;

  public async softDelete() {
    await softDelete(this);
  }
}
