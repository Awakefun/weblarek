import { Component } from '../base/Component';
import { IHeader } from '../../types';

export class Header extends Component<IHeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.basketButton = container.querySelector('.header__basket')!;
        this.counterElement = container.querySelector('.header__basket-counter')!;
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}