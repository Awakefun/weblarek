import { Card } from './Card';
import { ICardBasket } from '../../types';

export class CardBasket extends Card<ICardBasket> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.indexElement = container.querySelector('.basket__item-index')!;
        this.deleteButton = container.querySelector('.basket__item-delete')!;
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}