import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { SiteTheme } from './siteTheme.model';
import { User } from './user.model';

@Table({
    timestamps: false,
    paranoid: true,
    tableName: 'user_theme',
})
export class UserTheme extends Model<UserTheme> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    theme: string;

    @Column(DataType.STRING)
    device: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
        field: 'id',
    })
    ownerId: string;

    @ForeignKey(() => SiteTheme)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    themeId: string;
}
