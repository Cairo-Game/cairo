import axios from '../services/BaseService';
import { AxiosResponse } from 'axios';

export const getOauth = async ({
    redirect,
}: {
    redirect: string;
}): Promise<AxiosResponse<{ service_id: string }, any>> => {
    return await axios.get('oauth/yandex/service-id', { params: redirect });
};

export const postOauth = async (props: { code: string; redirect_uri: string }): Promise<AxiosResponse<any, any>> => {
    return await axios.post('oauth/yandex', props);
};
