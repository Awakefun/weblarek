import { Component } from '../base/Component';
import { IForm } from '../../types';
import { IEvents } from '../base/Events';

export abstract class Form<T extends IForm> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container);

        this.submitButton = container.querySelector('button[type="submit"]')!;
        this.errorsElement = container.querySelector('.form__errors')!;

        container.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;

            events.emit('form:change', {
                field: target.name,
                value: target.value
            });
        });

        container.addEventListener('submit', (event) => {
            event.preventDefault();

            events.emit(`${container.name}:submit`);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }
}