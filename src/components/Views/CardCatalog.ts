import { Card } from './Card';
import { ICardCatalog } from '../../types';
import { categoryMap } from '../../utils/constants';

export class CardCatalog extends Card<ICardCatalog> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);

        this.categoryElement = container.querySelector('.card__category')!;
        this.imageElement = container.querySelector('.card__image')!;

        this.container.addEventListener('click', onClick);
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
}