import { SiteTheme } from '../models/siteTheme.model';
import { User } from '../models/user.model';
import { UserTheme } from '../models/userTheme.model';
import { BaseRESTService } from './baseRestService';

interface FindRequest {
    id?: number; // ID темы в таблице
    title?: string; // Поиск по частичному совпадению в таблице
}

interface FindByUserRequest {
    id: number;
}

interface CreateRequest {
    theme: string;
    device: string;
    ownerId: string;
    themeId: string;
}

export class UserThemeService implements BaseRESTService {
    static find = ({ id, title }: FindRequest) => {
        if (id) {
            return SiteTheme.findByPk(id);
        }

        return SiteTheme.findOne({
            where: {
                theme: `%${title}%`, // Защита от SQL Injection присутствует
            },
        });
    };

    static findByUser = ({ id }: FindByUserRequest) => {
        if (id) {
            return UserTheme.findOne({ where: { ownerId: id } });
        }
    };

    static create = async (data: CreateRequest) => {
        return await UserTheme.create({
            theme: data.theme,
            ownerId: data.ownerId,
            themeId: data.themeId,
            device: data.device ?? null,
        });
    };

    static change = async (data: CreateRequest) => {
        const userAlreadyExist = await UserTheme.findOne({
            where: { ownerId: data.ownerId },
        });
        const userInTheSystem = await User.findOne({ where: { id: data.ownerId } });

        if (userInTheSystem) {
            if (userAlreadyExist) {
                const res = await UserTheme.update(
                    {
                        theme: data.theme,
                        themeId: data.themeId,
                        device: data.device ?? null,
                    },
                    { where: { ownerId: data.ownerId } },
                );
                if (res) {
                    return await UserTheme.findOne({
                        where: { ownerId: data.ownerId },
                    });
                }
            } else {
                return await UserTheme.create({
                    theme: data.theme,
                    ownerId: data.ownerId,
                    themeId: data.themeId,
                    device: data.device ?? null,
                });
            }
        } else {
            return undefined;
        }
    };
}
