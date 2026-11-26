import { Component } from '../base/Component';
import { IModal } from '../../types';

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.closeButton = container.querySelector('.modal__close')!;
        this.contentElement = container.querySelector('.modal__content')!;

        this.closeButton.addEventListener('click', () => {
            this.close();
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.contentElement.replaceChildren();
    }
}