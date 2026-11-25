import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IHeader } from '../../types';

export class Header extends Component<IHeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.basketButton = container.querySelector('.header__basket')!;
        this.counterElement = container.querySelector('.header__basket-counter')!;

        this.basketButton.addEventListener('click', () => {
            events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}