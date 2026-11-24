export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TPayment = 'card' | 'cash';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IBuyerData {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

export interface IBuyerErrors {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IHeader {
    counter: number;
}

export interface IGallery {
    items: HTMLElement[];
}

export interface IModal {
    content: HTMLElement;
}

export interface ICard {
    title: string;
    price: number | null;
}

export interface ICardCatalog extends ICard {
    category: string;
    image: string;
}

export interface ICardPreview extends ICardCatalog {
    description: string;
    buttonText: string;
    disabled: boolean;
}

export interface ICardBasket extends ICard {
    index: number;
}