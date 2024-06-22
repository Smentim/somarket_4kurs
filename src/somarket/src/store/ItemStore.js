import {makeAutoObservable} from "mobx";

export default class ItemStore {
    constructor() {
        this._types = []
        this._classes = []
        this._items = []
        this._selectedType = {}
        this._selectedClass = {}
        this._page = 1
        this._totalCoun = 0
        this._limit = 10
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setClasses(classes) {
        this._classes = classes
    }

    setItems(item) {
        this._items = item
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedClass(classe) {
        this.setPage(1)
        this._selectedClass = classe
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCoun = count
    }

    get types() {
        return this._types
    }

    get classes() {
        return this._classes
    }

    get items() {
        return this._items
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedClass() {
        return this._selectedClass
    }

    get totalCount() {
        return this._totalCoun
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}