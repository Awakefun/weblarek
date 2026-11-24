import { Component } from '../base/Component';
import { ICard } from '../../types';
import { CDN_URL, categoryMap } from '../../utils/constants';

export abstract class Card<T extends ICard> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected categoryElement: HTMLElement | null;
    protected imageElement: HTMLImageElement | null;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = container.querySelector('.card__title')!;
        this.priceElement = container.querySelector('.card__price')!;
        this.categoryElement = container.querySelector('.card__category');
        this.imageElement = container.querySelector('.card__image');
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent =
            value === null ? 'Бесценно' : `${value} синапсов`;
    }

    set category(value: string) {
        if (this.categoryElement) {
            this.categoryElement.textContent = value;

            this.categoryElement.classList.remove(
                ...Object.values(categoryMap)
            );

            const categoryClass = categoryMap[value as keyof typeof categoryMap];

            if (categoryClass) {
                this.categoryElement.classList.add(categoryClass);
            }
        }
    }

    set image(value: string) {
        if (this.imageElement) {
            this.setImage(this.imageElement, CDN_URL + value);
        }
    }
}