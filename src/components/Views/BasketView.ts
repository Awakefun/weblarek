import { Component } from '../base/Component';
import { IBasketView } from '../../types';
import { IEvents } from '../base/Events';

export class BasketView extends Component<IBasketView> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected orderButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.listElement = container.querySelector('.basket__list')!;
        this.totalElement = container.querySelector('.basket__price')!;
        this.orderButton = container.querySelector('.basket__button')!;

        this.orderButton.addEventListener('click', () => {
            events.emit('order:open');
        });
    }

    set items(value: HTMLElement[]) {
        if (value.length === 0) {
            const message = document.createElement('li');
            message.textContent = 'Корзина пуста';

            this.listElement.replaceChildren(message);
        } else {
            this.listElement.replaceChildren(...value);
        }
    }

    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`;
    }

    set disabled(value: boolean) {
        this.orderButton.disabled = value;
    }
}