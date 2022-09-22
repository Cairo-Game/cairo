import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user',
})
export class User extends Model<User> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    avatar: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    secondName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    login: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;
}
