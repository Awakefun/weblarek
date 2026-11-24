import { Card } from './Card';
import { ICardCatalog } from '../../types';

export class CardCatalog extends Card<ICardCatalog> {
    constructor(container: HTMLElement) {
        super(container);
    }
}