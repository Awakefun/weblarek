import { Card } from './Card';
import { ICardCatalog } from '../../types';

export class CardCatalog extends Card<ICardCatalog> {
    constructor(container: HTMLElement, onClick: () => void) {
        super(container);

        this.container.addEventListener('click', onClick);
    }
}