import { Card } from './Card';
import { ICardPreview } from '../../types';

export class CardPreview extends Card<ICardPreview> {
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.descriptionElement = container.querySelector('.card__text')!;
        this.buttonElement = container.querySelector('.card__button')!;
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set disabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}