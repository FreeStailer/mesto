//класс под АПИ
export class Api {
    constructor(options) {
        this._headers = options.headers;
        this._baseUrl = options.baseUrl;
    }

    //сократитим код вставляя АПИ уже в частный метод фетча, дабы не дублировать одно и то же в коде
    _fetch(url, method, body) {
        return fetch(this._baseUrl + url, {
            method: method,
            headers: this._headers,
            body: body
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибочка вышла: ${res.status}`);
        });
    }

    //далее идут методы которые подставляюся в выше написанный метод
    //получить список карточек
    getInitialCards() {
        return this._fetch('/cards', 'GET')
    }

    //добавить карточку
    addUserCard(values) {
        return this._fetch('/cards', 'POST', JSON.stringify({
            name: values.name,
            link: values.link
        }))
    }

    //поставить лайк
    takeCardLike(cardId) {
        return this._fetch(`/cards/likes/${cardId}`, 'PUT') //почему-то при использовании $ приходится менять кавычки...
    }

    //удалить лайк
    removeCardLike(cardId) {
        return this._fetch(`/cards/likes/${cardId}`, 'DELETE') //почему-то при использовании $ приходится менять кавычки...
    }

    //удалить карточку
    delCard(cardId) {
        return this._fetch(`/cards/${cardId}`, 'DELETE') //почему-то при использовании $ приходится менять кавычки...
    }

    //получить имя и професию с сервака
    getUserData() {
        return this._fetch('/users/me', 'GET')
    }

    //изменить имя и професию на серваке
    patchUserData(values) {
        return this._fetch('/users/me', 'PATCH', JSON.stringify({
            name: values.name,
            about: values.about
        }))
    }

    // изменить аватарку на серваке
    patchUserAvatar(values) {
        return this._fetch('/users/me/avatar', 'PATCH', JSON.stringify({
            avatar: values.avatar
        }))
    }
}