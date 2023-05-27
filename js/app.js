class Model {
    constructor() {
        this.avengersList = [
            {id: 0, name: "Captain America", url: "./img/cptamerica.jpeg", clicks: 0},
            {id: 1, name: "Iron Man", url: "./img/ironman.jpeg", clicks: 0},
            {id: 2, name: "Spiderman", url: "./img/spiderman.jpeg", clicks: 0},
            {id: 3, name: "Hulk", url: "./img/hulkSMASH.jpeg", clicks: 0},
        ]

        this.currentAvengerID = 0;

        this.admin = false;
    }

    selectAvenger(id) {
        this.currentAvengerID = id;
        this.onAvengerChange(this.avengersList);
    }

    addClicks() {
        this.avengersList[this.currentAvengerID].clicks = Number(this.avengersList[this.currentAvengerID].clicks) + 1;

        this.onAvengerChange(this.avengersList);
    }

    /** Edits an avenger's attributes.
     * @param {*} newName 
     * @param {*} newUrl 
     * @param {*} newClicks 
     */
    editAvenger(newName, newUrl, newClicks) {
        this.avengersList[this.currentAvengerID] = {id: this.currentAvengerID, name: newName, url: newUrl, clicks: newClicks};
        this.onAvengerChange(this.avengersList);
    }

    toggleAdmin() {
        if(this.admin) {
            this.admin = false;
        } else {
            this.admin = true;
        }

        this.onAvengerChange(this.avengersList);
    }
    
    /** Binding function that notifies the controller of an update in the model to be reflected in the view.
     * @param {*} callback Accepts the list of avengers as an arguement for a callback function that executes the controller onChange function.
     */
    bindAvengerChanged(callback) {
        this.onAvengerChange = callback;
    }

    // === CONSOLE COMMAND UTILITY ====
    // /** Adds a new avenger, with a default number of clicks = 0.
    //  * @param {*} newName name of new avenger.
    //  * @param {*} newUrl url of avenger's photo
    //  * @param {*} newClicks number of clicks, default = 0.
    //  */
    // addAvenger(newName, newUrl, newClicks = 0) {
    //     const newAvenger = {
    //         id: this.avengersList.length > 0 ? this.avengersList[this.avengersList.length - 1].id : 1,
    //         name: newName,
    //         url: newUrl,
    //         clicks: newClicks
    //     }

    //     this.avengersList.push(newAvenger);
    //     this.onAvengerChange(this.avengersList);
    // }
}

class View {
    constructor() {}

    render(avenger, avengers) {
        $("#thumbnail-col, #current-avenger").empty();
        this.renderCurrentAvenger(avenger);
        this.renderThumbnails(avengers);
    }

    // ======================

    renderAdminPanel(avenger) {
        $("#admin-panel").empty();
        const adminTemplate = this._createAdminTemplate(avenger);
        $("#admin-panel").append(adminTemplate);
    }

    _createAdminTemplate(avenger) {
        const template = `
        <form id="admin-tools" class="bg-light p-4">
            <h2>Admin Tools</h2>
            <hr>

            <div class="mb-3">
                <label for="admin-avenger-name" class="form-label">Avenger Name:</label>
                <input type="text" class="form-control" id="admin-avenger-name" value="${avenger.name}">
            </div>

            <div class="mb-3">
                    <label for="admin-avenger-url" class="form-label">Avenger URL:</label>
                    <input type="text" class="form-control" id="admin-avenger-url" value="${avenger.url}">
            </div>

            <div class="mb-3">
                <label for="admin-avenger-clicks" class="form-label">Avenger Clicks:</label>
                <input type="number" class="form-control" id="admin-avenger-clicks" value="${avenger.clicks}">
            </div>

            <div class="buttons d-flex justify-content-between">
                <button type="submit" class="btn btn-primary" id="save-button">Submit</button>
                <button type="submit" class="btn btn-danger" id="cancel-button">Cancel</button>
            </div>
        </form>
        `;

        return template;
    }

    // ======================

    renderCurrentAvenger(avenger) {
        const avengerTemplate = this._createAvengerTemplate(avenger);
        $("#current-avenger").append(avengerTemplate);
    }

    _createAvengerTemplate(avenger) {
        const template = `
        <div class="row text-center">
            <h1 class="fw-bold">${avenger.name}</h1>
        </div>

        <div class="row">
            <img src="${avenger.url}" class="img-fluid p-5" id="avenger-img" alt="an image of a ${avenger.name}">
        </div>

        <div class="row text-center fs-2">
            <span>Clicks: ${avenger.clicks}</span>
        </div>
        `;

        return template;
    }

    // ======================

    renderThumbnails(avengers) {
        avengers.forEach(avenger => {
            const thumbnailTemplate = this._createAvengerThumbnailTemplate(avenger.id, avenger.name, avenger.url);
            $("#thumbnail-col").append(thumbnailTemplate);
        });
    }

    _createAvengerThumbnailTemplate(id, name, url) {
        const template = `
        <img src="${url}" class="w-50 mt-3 thumbnail-img" id="${id}" alt="an image of ${name}">
        `;

        return template;
    }

    // ======================

    _resetForm() {
        $("#admin-tools").reset();
    }

    // ======================

    bindSelectAvenger(handler) {
        $("#thumbnail-col").on("click", ".thumbnail-img", function(e) {
            e.preventDefault();

            handler($(e.target).attr("id"));
        });
    }

    bindClickAvenger(handler) {
        $("#current-avenger").on("click", "#avenger-img", function (e) {
            e.preventDefault();

            handler();
        });
    }

    bindEditAvenger(handler) {
        $("#admin-panel").on("click", "#save-button", function (e) {
            e.preventDefault();

            handler({name: $("#admin-avenger-name").val(), url: $("#admin-avenger-url").val(), clicks: $("#admin-avenger-clicks").val()});

            $("#admin-panel").empty();
            $("#admin-toggler").toggleClass("d-none");
            $("#admin-panel").toggleClass("d-none");
        });

    }
      
    bindCancel(handler) {
        $("#admin-panel").on("click", "#cancel-button", function (e) {
            e.preventDefault();

            handler();
            
            $("#admin-toggler").toggleClass("d-none");
            $("#admin-panel").toggleClass("d-none");
            $("#admin-panel").empty();
        });
    }
      
    bindToggleAdmin(handler) {
        $("#admin-toggler").on("click", "#admin-btn", function (e) {
            e.preventDefault();
    
            handler();

            $("#admin-toggler").toggleClass("d-none");
            $("#admin-panel").toggleClass("d-none");
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.render(this.model.avengersList[this.model.currentAvengerID], this.model.avengersList); // Page initialization

        this.model.bindAvengerChanged(this.onAvengerChange);

        this.view.bindSelectAvenger(this.handleSelectAvenger);
        this.view.bindClickAvenger(this.handleAddClick);
        this.view.bindToggleAdmin(this.handleToggleAdmin);
        this.view.bindCancel(this.handleToggleAdmin);
        this.view.bindEditAvenger(this.handleEditAvenger)
    }

    onAvengerChange = (avengers) => {
        this.view.render(avengers[this.model.currentAvengerID], avengers);

        if(this.model.admin) {
            this.view.renderAdminPanel(avengers[this.model.currentAvengerID]);
        }
    }

    handleSelectAvenger = (id) => {
        this.model.selectAvenger(id);
    }

    handleAddClick = () => {
        this.model.addClicks();
    }
      
    handleEditAvenger = (avenger) => {
        this.model.editAvenger(avenger.name, avenger.url, avenger.clicks)
        this.handleToggleAdmin(); // Is it better for the controller to toggle the admin panel itself or should the model call it's internal function?
    }   
      
    handleToggleAdmin = () => {
        this.model.toggleAdmin()
    }
}

const app = new Controller(new Model(), new View());