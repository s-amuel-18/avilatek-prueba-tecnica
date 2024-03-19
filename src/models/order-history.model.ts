import {
  Model,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';

export const pendingStatusOrder = 1;
export const deliveredStatusOrder = 2;
export const canceledStatusOrder = 3;

export const statusOrderTypes = {
  [pendingStatusOrder]: { id: pendingStatusOrder, name: 'Pendiente' },
  [deliveredStatusOrder]: { id: deliveredStatusOrder, name: 'Entregado' },
  [canceledStatusOrder]: { id: canceledStatusOrder, name: 'Cancelado' },
};

export const orderStatusArray = Object.keys(statusOrderTypes).map(s => +s);

@Table({ tableName: 'orders_history' })
export class OrderHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'fk_user_id', allowNull: false })
  userId: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, field: 'fk_product_id', allowNull: false })
  productId: number;

  @Column({ type: DataType.INTEGER, field: 'status', allowNull: false })
  status: number;

  @Column({ type: DataType.INTEGER, field: 'quantity', allowNull: false })
  quantity: number;

  @Column({ type: DataType.DATE, field: 'requested_on', allowNull: false })
  requestedOn: Date;

  // * Relations
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;
}
