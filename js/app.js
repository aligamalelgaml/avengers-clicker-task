class Model {
    constructor() {
        this.avengersList = [
            {id: 1, name: "Captain America", url: "./img/test1.jpeg", clicks: 0},
            {id: 2, name: "Iron Man", url: "./img/test2.jpeg", clicks: 0},
        ]

        this.currentAvengerID = 1;
    }

    /** Adds a new avenger, with a default number of clicks = 0.
     * @param {*} newName name of new avenger.
     * @param {*} newUrl url of avenger's photo
     * @param {*} newClicks number of clicks, default = 0.
     */
    addAvenger(newName, newUrl, newClicks = 0) {
        const newAvenger = {
            id: this.avengersList.length > 0 ? this.avengersList[this.avengersList.length - 1].id + 1 : 1,
            name: newName,
            url: newUrl,
            clicks: newClicks
        }

        this.avengersList.push(newAvenger);
    }

    /** Edits an avenger's attributes.
     * @param {*} id 
     * @param {*} newName 
     * @param {*} newUrl 
     * @param {*} newClicks 
     */
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

    renderAdminPanel() {
        const adminTemplate = this._createAdminTemplate();
        $("#admin-panel").append(adminTemplate);
    }

    _createAdminTemplate() {
        template = `
        <form id="admin-tools">
            <h2>Admin Tools</h2>
            <hr>

            <div class="mb-3">
                <label for="avenger-name" class="form-label">Avenger Name:</label>
                <input type="text" class="form-control" id="avenger-name">
            </div>

            <div class="mb-3">
                    <label for="avenger-url" class="form-label">Avenger URL:</label>
                    <input type="text" class="form-control" id="avenger-url">
            </div>

            <div class="mb-3">
                <label for="avenger-clicks" class="form-label">Avenger Clicks:</label>
                <input type="" class="form-control" id="avenger-clicks">
            </div>

            <div class="buttons d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="submit" class="btn btn-danger">Cancel</button>
            </div>
        </form>
        `;

        return template;
    }

    // ====================

    renderCurrentAvenger(avenger) {
        const avengerTemplate = this._createAvengerTemplate(avenger);
        $("#current-avenger").append(avengerTemplate);
    }

    _createAvengerTemplate(avenger) {
        const template = `
        <div class="row text-center">
            <h1>${avenger.name}</h1>
        </div>

        <div class="row">
            <img src="${avenger.url}" class="img-fluid" alt="an image of a ${avenger.name}">
        </div>

        <div class="row">
            <span>Clicks: </span>
            <span>${avenger.clicks}</span>
        </div>
        `;

        return template;
    }

    // ===============================

    renderThumbnails(avengers) {
        avengers.forEach(avenger => {
            const thumbnailTemplate = this._createAvengerThumbnailTemplate(url);
            $("#thumbnail-col").append(thumbnailTemplate);
        });
    }

    _createAvengerThumbnailTemplate(url) {
        const template = `
        <img src="${url}" class="img-fluid mt-3" alt="">
        `;

        return template;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View());