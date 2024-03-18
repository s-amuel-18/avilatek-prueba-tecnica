import { Model, AutoIncrement, Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

export const roleAdmin = 1;
export const roleClient = 2;

@Table({ tableName: 'roles' })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING(50), field: 'name', allowNull: false, unique: true })
  name: string;
}
