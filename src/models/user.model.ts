import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  Default,
  BeforeCreate,
  UpdatedAt,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.INTEGER, field: 'fk_role_id', allowNull: false })
  roleId: number;

  @Column({ type: DataType.STRING(50), field: 'name', allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), field: 'email', unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(100), field: 'password', unique: true, allowNull: false })
  password: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  // * Hooks
  @BeforeCreate
  static async hashPassword(instance: User) {
    const salt = await bcrypt.genSalt(10);
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  // * Methods
  verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
