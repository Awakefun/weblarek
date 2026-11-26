import { Card } from './Card';
import { ICardPreview } from '../../types';
import { IEvents } from '../base/Events';
import { categoryMap } from '../../utils/constants';

export class CardPreview extends Card<ICardPreview> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.categoryElement = container.querySelector('.card__category')!;
        this.imageElement = container.querySelector('.card__image')!;
        this.descriptionElement = container.querySelector('.card__text')!;
        this.buttonElement = container.querySelector('.card__button')!;

        this.buttonElement.addEventListener('click', () => {
            events.emit('card:action');
        });
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        this.categoryElement.classList.remove(
            ...Object.values(categoryMap)
        );

        const categoryClass =
            categoryMap[value as keyof typeof categoryMap];

        if (categoryClass) {
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set image(value: string) {
        this.setImage(this.imageElement, value);
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