import './scss/styles.scss';

import { Products } from './components/Models/Products';

import { apiProducts } from './utils/data';

import { Basket } from './components/Models/Basket';

import { Buyer } from './components/Models/Buyer';

import { Api } from './components/base/api';

import { WebLarekApi } from './components/WebLarekApi';

import { API_URL } from './utils/constants';

const productsModel = new Products();

productsModel.setItems(apiProducts.items);

console.log(
    'Массив товаров из каталога:',
    productsModel.getItems()
);

const firstProduct = apiProducts.items[0];

console.log(
    'Товар по id:',
    productsModel.getItem(firstProduct.id)
);

productsModel.setSelectedItem(firstProduct);

console.log(
    'Выбранный товар:',
    productsModel.getSelectedItem()
);

const basketModel = new Basket();

basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);

console.log(
    'Товары в корзине:',
    basketModel.getItems()
);

console.log(
    'Количество товаров в корзине:',
    basketModel.getCount()
);

console.log(
    'Общая стоимость корзины:',
    basketModel.getTotal()
);

console.log(
    'Есть ли первый товар в корзине:',
    basketModel.hasItem(apiProducts.items[0].id)
);

basketModel.removeItem(apiProducts.items[0]);

console.log(
    'Корзина после удаления первого товара:',
    basketModel.getItems()
);

basketModel.clear();

console.log(
    'Корзина после очистки:',
    basketModel.getItems()
);

const buyerModel = new Buyer();

console.log(
    'Начальные данные покупателя:',
    buyerModel.getData()
);

buyerModel.setPayment('card');
buyerModel.setEmail('test@test.com');
buyerModel.setPhone('+123456789');
buyerModel.setAddress('Main street 10');

console.log(
    'Заполненные данные покупателя:',
    buyerModel.getData()
);

console.log(
    'Ошибки заполненного покупателя:',
    buyerModel.validate()
);

buyerModel.clear();

console.log(
    'Данные покупателя после очистки:',
    buyerModel.getData()
);

console.log(
    'Ошибки после очистки:',
    buyerModel.validate()
);

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

webLarekApi.getProducts()
    .then((data) => {
        productsModel.setItems(data.items);

        console.log(
            'Товары с сервера:',
            productsModel.getItems()
        );
    })
    .catch((error) => {
        console.error(
            'Ошибка получения товаров:',
            error
        );
    });

webLarekApi.postOrder({
    payment: 'card',
    email: 'test@test.ru',
    phone: '+71234567890',
    address: 'Spb Vosstania 1',
    total: 2200,
    items: [
        apiProducts.items[0].id,
        apiProducts.items[1].id
    ]
})
  .then((data) => {
      console.log('Ответ сервера на заказ:', data);
  })
  .catch((error) => {
      console.error('Ошибка отправки заказа:', error);
  });