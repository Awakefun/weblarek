import './scss/styles.scss';

import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL, CDN_URL} from './utils/constants';

import { Header } from './components/Views/Header';
import { Gallery } from './components/Views/Gallery';
import { CardCatalog } from './components/Views/CardCatalog';
import { Modal } from './components/Views/Modal';
import { CardPreview } from './components/Views/CardPreview';
import { BasketView } from './components/Views/BasketView';
import { CardBasket } from './components/Views/CardBasket';
import { OrderForm } from './components/Views/OrderForm';
import { ContactsForm } from './components/Views/ContactsForm';
import { Success } from './components/Views/Success';
import { TPayment } from './types';
import { IOrder } from './types';

const events = new EventEmitter();

const productsModel = new Products(events);
const basketModel = new Basket(events);
const buyerModel = new Buyer(events);


const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);


const cardCatalogTemplate = document.querySelector<HTMLTemplateElement>(
    '#card-catalog'
)!;

const cardPreviewTemplate = document.querySelector<HTMLTemplateElement>(
    '#card-preview'
)!;

const cardBasketTemplate = document.querySelector<HTMLTemplateElement>(
    '#card-basket'
)!;

const basketTemplate = document.querySelector<HTMLTemplateElement>(
    '#basket'
)!;

const orderTemplate = document.querySelector<HTMLTemplateElement>(
    '#order'
)!;

const contactsTemplate = document.querySelector<HTMLTemplateElement>(
    '#contacts'
)!;

const successTemplate = document.querySelector<HTMLTemplateElement>(
    '#success'
)!;


const header = new Header(
    document.querySelector<HTMLElement>('.header')!,
    events
);

const gallery = new Gallery(
    document.querySelector<HTMLElement>('.gallery')!
);

const modal = new Modal(
    document.querySelector<HTMLElement>('#modal-container')!
);

const cardPreviewElement = cardPreviewTemplate.content
    .firstElementChild!.cloneNode(true) as HTMLElement;

const cardPreview = new CardPreview(cardPreviewElement, events);

const basketElement = basketTemplate.content
    .firstElementChild!.cloneNode(true) as HTMLElement;

const basketView = new BasketView(basketElement, events);

const orderElement = orderTemplate.content
    .firstElementChild!.cloneNode(true) as HTMLFormElement;

const orderForm = new OrderForm(orderElement, events);

const contactsElement = contactsTemplate.content
    .firstElementChild!.cloneNode(true) as HTMLFormElement;

const contactsForm = new ContactsForm(contactsElement, events);

const successElement = successTemplate.content
    .firstElementChild!.cloneNode(true) as HTMLElement;

const success = new Success(successElement, events);

events.on('products:changed', () => {
    const cards = productsModel.getItems().map((product) => {
        const cardElement = cardCatalogTemplate.content
            .firstElementChild!.cloneNode(true) as HTMLElement;

        const card = new CardCatalog(cardElement, () => {
            events.emit('card:select', {
                id: product.id
            });
        });

        return card.render({
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image
        });
    });

    gallery.render({
        items: cards
    });
});

events.on<{ id: string }>('card:select', (data) => {
    const product = productsModel.getItem(data.id);

    if (product) {
        productsModel.setSelectedItem(product);
    }
});

events.on('product:selected', () => {
    const product = productsModel.getSelectedItem();

    if (!product) {
        return;
    }

    const inBasket = basketModel.hasItem(product.id);
    const unavailable = product.price === null;

    modal.render({
        content: cardPreview.render({
            title: product.title,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            buttonText: unavailable
                ? 'Недоступно'
                : inBasket
                    ? 'Удалить из корзины'
                    : 'Купить',
            disabled: unavailable
        })
    });

    modal.open();
});

events.on('modal:close', () => {
    modal.close();
});

events.on('card:action', () => {
    const product = productsModel.getSelectedItem();

    if (!product || product.price === null) {
        return;
    }

    if (basketModel.hasItem(product.id)) {
        basketModel.removeItem(product);
    } else {
        basketModel.addItem(product);
    }

    modal.close();
});

function renderBasket(): void {
    const items = basketModel.getItems();

    const cards = items.map((product, index) => {
        const cardElement = cardBasketTemplate.content
            .firstElementChild!.cloneNode(true) as HTMLElement;

        const card = new CardBasket(cardElement, () => {
            events.emit('basket:remove', {
                id: product.id
            });
        });

        return card.render({
            index: index + 1,
            title: product.title,
            price: product.price
        });
    });

    basketView.render({
        items: cards,
        total: basketModel.getTotal(),
        disabled: basketModel.getCount() === 0
    });
}

events.on('basket:changed', () => {
    renderBasket();

    header.render({
        counter: basketModel.getCount()
    });
});

events.on('basket:open', () => {
    renderBasket();

    modal.render({
        content: basketView.render()
    });

    modal.open();
});

events.on<{ id: string }>('basket:remove', (data) => {
    const product = productsModel.getItem(data.id);

    if (product) {
        basketModel.removeItem(product);
    }
});

events.on('order:open', () => {
    if (basketModel.getCount() === 0) {
        return;
    }

    const buyer = buyerModel.getData();
    const errors = buyerModel.validate();

    modal.render({
        content: orderForm.render({
            payment: buyer.payment,
            address: buyer.address,
            valid: !errors.payment && !errors.address,
            errors: [
                errors.payment,
                errors.address
            ].filter(Boolean).join('. ')
        })
    });

    modal.open();
});

events.on<{ payment: TPayment }>('payment:change', (data) => {
    buyerModel.setPayment(data.payment);
});

events.on<{ field: string; value: string }>('form:change', (data) => {
    switch (data.field) {
        case 'address':
            buyerModel.setAddress(data.value);
            break;

        case 'email':
            buyerModel.setEmail(data.value);
            break;

        case 'phone':
            buyerModel.setPhone(data.value);
            break;
    }
});

events.on('buyer:changed', () => {
    const buyer = buyerModel.getData();
    const errors = buyerModel.validate();

    orderForm.render({
        payment: buyer.payment,
        address: buyer.address,
        valid: !errors.payment && !errors.address,
        errors: [
            errors.payment,
            errors.address
        ].filter(Boolean).join('. ')
    });

    contactsForm.render({
        email: buyer.email,
        phone: buyer.phone,
        valid: !errors.email && !errors.phone,
        errors: [
            errors.email,
            errors.phone
        ].filter(Boolean).join('. ')
    });
});

events.on('order:submit', () => {
    const buyer = buyerModel.getData();
    const errors = buyerModel.validate();

    modal.render({
        content: contactsForm.render({
            email: buyer.email,
            phone: buyer.phone,
            valid: !errors.email && !errors.phone,
            errors: [
                errors.email,
                errors.phone
            ].filter(Boolean).join('. ')
        })
    });

    modal.open();
});

events.on('contacts:submit', () => {
    const buyer = buyerModel.getData();

    const order: IOrder = {
        payment: buyer.payment as TPayment,
        email: buyer.email,
        phone: buyer.phone,
        address: buyer.address,
        total: basketModel.getTotal(),
        items: basketModel.getItems().map((product) => product.id)
    };

    webLarekApi.postOrder(order)
        .then((data) => {
            basketModel.clear();
            buyerModel.clear();

            modal.render({
                content: success.render({
                    total: data.total
                })
            });

            modal.open();
        })
        .catch((error) => {
            console.error('Ошибка оформления заказа:', error);
        });
});

webLarekApi.getProducts()
    .then((data) => {
        data.items.forEach((product) => {
            product.image = CDN_URL + product.image;
        });

        productsModel.setItems(data.items);
    })
    .catch((error) => {
        console.error('Ошибка получения товаров:', error);
    });