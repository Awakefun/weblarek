import { Component } from '../base/Component';
import { ISuccess } from '../../types';
import { IEvents } from '../base/Events';

export class Success extends Component<ISuccess> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.descriptionElement = container.querySelector('.order-success__description')!;
        this.closeButton = container.querySelector('.order-success__close')!;

        this.closeButton.addEventListener('click', () => {
            events.emit('modal:close');
        });
    }

    set total(value: number) {
        this.descriptionElement.textContent = `Списано ${value} синапсов`;
    }
}