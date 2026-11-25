import { Form } from './Form';
import { IOrderForm, TPayment } from '../../types';
import { IEvents } from '../base/Events';

export class OrderForm extends Form<IOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.cardButton = container.querySelector('[name="card"]')!;
        this.cashButton = container.querySelector('[name="cash"]')!;
        this.addressInput = container.querySelector('[name="address"]')!;

        this.cardButton.addEventListener('click', () => {
            events.emit('payment:change', {
                payment: 'card'
            });
        });

        this.cashButton.addEventListener('click', () => {
            events.emit('payment:change', {
                payment: 'cash'
            });
        });
    }

    set payment(value: TPayment | null) {
        this.cardButton.classList.toggle(
            'button_alt-active',
            value === 'card'
        );

        this.cashButton.classList.toggle(
            'button_alt-active',
            value === 'cash'
        );
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}