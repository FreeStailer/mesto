export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        const renderedItems = this._items.map(item =>
            this._renderer(item)
        )
        this.addItem(renderedItems)
    }

    addItem(element) {
        if (Array.isArray(element)) {
            element.forEach(item =>
                this._container.append(item)
                )
        } else {
            this._container.prepend(element);
        }
    }
}