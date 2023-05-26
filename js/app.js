class Model {
    constructor() {
        this.avengersList = [
            {id: 1, name: "Captain America", url: "./img/test1.jpeg", clicks: 0},
            {id: 2, name: "Iron Man", url: "./img/test2.jpeg", clicks: 0},
        ]
    }

    addAvenger(newName, newUrl, newClicks = 0) {
        const newAvenger = {
            id: this.avengersList.length > 0 ? this.avengersList[this.avengersList.length - 1].id + 1 : 1,
            name: newName,
            url: newUrl,
            clicks: newClicks
        }

        this.avengersList.push(newAvenger);
    }

    editAvenger(id, newName, newUrl, newClicks) {
        this.avengersList.map((avenger) => {
            avenger.id === id ? {id: avenger.id, name: newName, url: newUrl, clicks: newClicks} : avenger
        });
    }

    deleteAvenger(id) {
        this.avengersList.filter((avenger) => avenger.id !== id);
    }
}

class View {
    constructor() {}
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View());