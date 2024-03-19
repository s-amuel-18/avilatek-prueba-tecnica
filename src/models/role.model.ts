import { Model, AutoIncrement, Column, DataType, PrimaryKey, Table } from 'sequelize-typescript';

export const adminRole = 1;
export const clientRole = 2;

@Table({ tableName: 'roles' })
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING(50), field: 'name', allowNull: false, unique: true })
  name: string;
}
