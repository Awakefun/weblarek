import { Form } from './Form';
import { IContactsForm } from '../../types';
import { IEvents } from '../base/Events';

export class ContactsForm extends Form<IContactsForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.emailInput = container.querySelector('[name="email"]')!;
        this.phoneInput = container.querySelector('[name="phone"]')!;
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}