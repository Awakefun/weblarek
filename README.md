https://github.com/Awakefun/weblarek

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные

### `TPayment`
Тип способа оплаты:

```ts
type TPayment = 'card' | 'cash';
```

### `IProduct`
Описывает товар магазина:

```ts
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
```

Поля:
`id — уникальный идентификатор товара;`
`description — описание товара;`
`image — путь к изображению товара;`
`title — название товара;`
`category — категория товара;`
`price — стоимость товара, null — товар недоступен для покупки.`

### `IBuyer`
Описывает данные покупателя:

```ts
interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}
```

Поля:
`payment — способ оплаты;`
`email — электронная почта покупателя;`
`phone — номер телефона;`
`address — адрес доставки.`

### `IBuyerData`
Используется для хранения текущих данных покупателя.  
Поле `payment` может быть `null`, если способ оплаты ещё не выбран.

```ts
interface IBuyerData {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}
```

Поля:
`payment — способ оплаты, null — способ оплаты ещё не выбран;`
`email — электронная почта покупателя;`
`phone — номер телефона;`
`address — адрес доставки.`

### `IBuyerErrors`
Описывает ошибки валидации данных покупателя.

```ts
interface IBuyerErrors {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}
```

Поля:
`payment — текст ошибки выбора способа оплаты;`
`email — текст ошибки заполнения электронной почты;`
`phone — текст ошибки заполнения телефона;`
`address — текст ошибки заполнения адреса.`

### `IProductsResponse`
Описывает ответ сервера со списком товаров.

```ts
interface IProductsResponse {
    total: number;
    items: IProduct[];
}
```

Поля:
`total — общее количество товаров;`
`items — массив товаров каталога.`

### `IOrder`
Описывает данные заказа, отправляемые на сервер.

```ts
interface IOrder extends IBuyer {
    total: number;
    items: string[];
}
```

Поля:
`total — общая стоимость заказа;`
`items — массив идентификаторов товаров в заказе.`

### `IOrderResponse`
Описывает ответ сервера после успешного оформления заказа.

```ts
interface IOrderResponse {
    id: string;
    total: number;
}
```

Поля:
`id — уникальный идентификатор заказа;`
`total — итоговая стоимость заказа.`

## Модели данных

### `Products`
Хранит каталог товаров и товар, выбранный для подробного просмотра.

Поля:
- `items: IProduct[]` — каталог товаров;
- `selectedItem: IProduct | null` — выбранный товар.

Методы:
- `setItems(items: IProduct[]): void` — сохранить товары;
- `getItems(): IProduct[]` — получить каталог;
- `getItem(id: string): IProduct | undefined` — найти товар по `id`;
- `setSelectedItem(item: IProduct): void` — сохранить выбранный товар;
- `getSelectedItem(): IProduct | null` — получить выбранный товар.

### `Basket`
Хранит товары, добавленные в корзину.

Поля:
- `items: IProduct[]` — товары в корзине.

Методы:
- `getItems(): IProduct[]` — получить товары корзины;
- `addItem(item: IProduct): void` — добавить товар;
- `removeItem(item: IProduct): void` — удалить товар;
- `clear(): void` — очистить корзину;
- `getTotal(): number` — получить общую стоимость;
- `getCount(): number` — получить количество товаров;
- `hasItem(id: string): boolean` — проверить наличие товара.

### `Buyer`
Хранит данные покупателя и отвечает за их валидацию.

Поля:
- `payment: TPayment | null` — способ оплаты;
- `email: string` — email;
- `phone: string` — телефон;
- `address: string` — адрес.

Методы:
- `setPayment(payment: TPayment): void`;
- `setEmail(email: string): void`;
- `setPhone(phone: string): void`;
- `setAddress(address: string): void`;
- `getData(): IBuyerData` — получить все данные;
- `clear(): void` — очистить данные;
- `validate(): IBuyerErrors` — проверить заполненность полей.

## Слой коммуникации

### `WebLarekApi`

Класс отвечает за работу с API приложения.

Конструктор:
- `constructor(api: IApi)` — принимает объект для выполнения запросов.

Поля:
- `api: IApi` — объект для выполнения запросов к серверу.

Методы:
- `getProducts(): Promise<IProductsResponse>` — получает список товаров;
- `postOrder(order: IOrder): Promise<IOrderResponse>` — отправляет заказ на сервер.

## Слой представления

### `IHeader`

Описывает данные для отображения шапки сайта.

```ts
interface IHeader {
    counter: number;
}
```

Поля:
- `counter` — количество товаров в корзине.

### `Header`

Конструктор:
- `constructor(container: HTMLElement)` — принимает корневой элемент шапки сайта.

Поля:
- `basketButton: HTMLButtonElement` — кнопка открытия корзины;
- `counterElement: HTMLElement` — элемент счётчика товаров.

Методы:
- `set counter(value: number)` — обновляет счётчик товаров в корзине.

### `IGallery`

Описывает данные для отображения каталога.

```ts
interface IGallery {
    items: HTMLElement[];
}
```

Поля:
- `items` — массив HTML-элементов карточек товаров.

### `Gallery`

Конструктор:
- `constructor(container: HTMLElement)` — принимает контейнер каталога.

Поля:
- `container: HTMLElement` — контейнер каталога, наследуется от `Component`.

Методы:
- `set items(value: HTMLElement[])` — заменяет содержимое каталога переданными карточками.

### `IModal`

Описывает содержимое модального окна.

```ts
interface IModal {
    content: HTMLElement;
}
```

Поля:
- `content` — HTML-элемент содержимого модального окна.

### `Modal`

Отвечает за открытие, закрытие и отображение содержимого модального окна.

Конструктор:
- `constructor(container: HTMLElement)` — принимает корневой элемент модального окна.

Поля:
- `closeButton: HTMLButtonElement` — кнопка закрытия;
- `contentElement: HTMLElement` — контейнер содержимого.

Методы:
- `set content(value: HTMLElement)` — заменяет содержимое модального окна;
- `open(): void` — открывает модальное окно;
- `close(): void` — закрывает модальное окно и очищает содержимое.

### `ICard`

Описывает общие данные карточек товаров.

```ts
interface ICard {
    title: string;
    price: number | null;
}
```

Поля:
- `title` — название товара;
- `price` — стоимость товара, `null` — товар недоступен для покупки.

### `Card`

Является общим родителем для карточек товаров. Отвечает за отображение названия и стоимости товара.

Конструктор:
- `constructor(container: HTMLElement)` — принимает корневой элемент карточки.

Поля:
- `titleElement: HTMLElement` — элемент названия товара;
- `priceElement: HTMLElement` — элемент стоимости товара.
- `categoryElement: HTMLElement | null` — элемент категории товара;
- `imageElement: HTMLImageElement | null` — элемент изображения товара.

Методы:
- `set title(value: string)` — отображает название товара;
- `set price(value: number | null)` — отображает стоимость товара.
- `set category(value: string)` — отображает категорию товара и устанавливает соответствующий CSS-класс;
- `set image(value: string)` — устанавливает изображение товара.

### `CardCatalog`

Отвечает за отображение карточки товара в каталоге.

Конструктор:
- `constructor(container: HTMLElement)` — принимает корневой элемент карточки.

### `ICardPreview`

Описывает данные карточки подробного просмотра товара.

```ts
interface ICardPreview extends ICardCatalog {
    description: string;
    buttonText: string;
    disabled: boolean;
}
```

Наследует поля интерфейса `ICardCatalog`.

Дополнительные поля:
- `description` — описание товара;
- `buttonText` — текст кнопки;
- `disabled` — состояние блокировки кнопки.

### `CardPreview`

Отвечает за подробное отображение товара.

Конструктор:
- `constructor(container: HTMLElement)` — принимает корневой элемент карточки.

Поля:
- `descriptionElement: HTMLElement` — элемент описания товара;
- `buttonElement: HTMLButtonElement` — кнопка покупки или удаления товара.

Методы:
- `set description(value: string)` — отображает описание товара;
- `set buttonText(value: string)` — изменяет текст кнопки;
- `set disabled(value: boolean)` — блокирует или разблокирует кнопку.

### `ICardBasket`

Описывает данные карточки товара в корзине.

```ts
interface ICardBasket extends ICard {
    index: number;
}
```

Поля:
- `index` — порядковый номер товара в корзине.

### `CardBasket`

Отвечает за отображение отдельного товара в корзине.

Конструктор:
- `constructor(container: HTMLElement)` — принимает корневой элемент карточки.

Поля:
- `indexElement: HTMLElement` — элемент порядкового номера товара;
- `deleteButton: HTMLButtonElement` — кнопка удаления товара из корзины.

Методы:
- `set index(value: number)` — отображает порядковый номер товара.
