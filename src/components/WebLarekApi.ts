import {
    IApi,
    IOrder,
    IOrderResponse,
    IProductsResponse
} from '../types';

export class WebLarekApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    postOrder(order: IOrder): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order/', order);
    }
}

