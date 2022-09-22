import { SiteTheme } from '../models/siteTheme.model';
import { BaseRESTService } from './baseRestService';

interface FindRequest {
    id?: number; // ID темы в таблице
    title?: string; // Поиск по частичному совпадению в таблице
}

interface CreateRequest {
    title: string;
    description: string;
}

export class ThemeService implements BaseRESTService {
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

    static create = async (data: CreateRequest) => {
        return await SiteTheme.create({
            theme: data.title,
            description: data.description,
        });
    };
}
