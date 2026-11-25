import { IBuyerData, IBuyerErrors, TPayment } from '../../types';
import { IEvents } from '../base/Events';

export class Buyer {
    private payment: TPayment | null = null;
    private email: string = '';
    private phone: string = '';
    private address: string = '';
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setPayment(payment: TPayment): void {
        this.payment = payment;
        this.events.emit('buyer:changed');
    }

    setEmail(email: string): void {
        this.email = email;
        this.events.emit('buyer:changed');
    }

    setPhone(phone: string): void {
        this.phone = phone;
        this.events.emit('buyer:changed');
    }

    setAddress(address: string): void {
        this.address = address;
        this.events.emit('buyer:changed');
    }

    getData(): IBuyerData {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';

        this.events.emit('buyer:changed');
    }

    validate(): IBuyerErrors {
        const errors: IBuyerErrors = {};

        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.email) {
            errors.email = 'Укажите email';
        }

        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.address) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    }
}