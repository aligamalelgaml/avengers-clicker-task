class View {
    constructor() {}

    /** Renders the currently selected avenger and thumbnails for all avengers.
     * @param {*} avenger currently selected avenger
     * @param {*} avengers all avengers
     */
    render(avenger, avengers) {
        $("#thumbnail-col, #current-avenger").empty();
        this.renderCurrentAvenger(avenger);
        this.renderThumbnails(avengers);
    }

    // ======================

    /** Renders the admin panel.
     * @param {*} avenger currently selected avenger
     */
    renderAdminPanel(avenger) {
        $("#admin-panel").empty();
        const adminTemplate = this._createAdminTemplate(avenger);
        $("#admin-panel").append(adminTemplate);
    }

    /** Helper function containing the template for the creation of the admin form HTML element.
     * @param {*} avenger currently selected avenger
     * @returns {string} HTML template of form with values of currently selected avenger.
     */
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

    /** Renders currently selected avenger
     * @param {*} avenger currently selected avenger.
     */
    renderCurrentAvenger(avenger) {
        const avengerTemplate = this._createAvengerTemplate(avenger);
        $("#current-avenger").append(avengerTemplate);
    }

    /** Helper function that creates the HTML element for the currently selected avenger.
     * @param {*} avenger currently selected avenger.
     * @returns {string} HTML template of currently selected avenger (name, image, clicks)
     */
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

    /** Renders the thumbnails of all stored avengers.
     * @param {*} avengers all added avengers.
     */
    renderThumbnails(avengers) {
        avengers.forEach(avenger => {
            const thumbnailTemplate = this._createAvengerThumbnailTemplate(avenger.id, avenger.name, avenger.url);
            $("#thumbnail-col").append(thumbnailTemplate);
        });
    }

    /** Helper function that creates the HTML template for all avengers.
     * @param {*} id ID of said avenger.
     * @param {*} name name of said avenger.
     * @param {*} url url of said avenger.
     * @returns {string} HTML template of a single thumbnail for a single avenger.
     */
    _createAvengerThumbnailTemplate(id, name, url) {
        const template = `
        <img src="${url}" class="w-50 mt-3 thumbnail-img" id="${id}" alt="an image of ${name}">
        `;

        return template;
    }

    // ======================

    /**
     * Helper function that resets the admin panel and toggles it off.
     */
    _resetForm() {
        $("#admin-toggler").toggleClass("d-none");
        $("#admin-panel").toggleClass("d-none");
        $("#admin-panel").empty();
    }

    // ======================

    /** Notifies the controller of a new avenger selection event.
     * @param {*} handler binds to the controller's handleSelectAvenger function
     */
    bindSelectAvenger(handler) {
        $("#thumbnail-col").on("click", ".thumbnail-img", function(e) {
            e.preventDefault();

            handler($(e.target).attr("id"));
        });
    }

    /** Notifies the controller of a click event.
     * @param {*} handler binds to the controller's handleAddClick function
     */
    bindClickAvenger(handler) {
        $("#current-avenger").on("click", "#avenger-img", function (e) {
            e.preventDefault();

            handler();
        });
    }

    /** Grabs the values inserted into the form and passed it to a handler function in the controller
     * @param {*} handler binds to the controller's handleEditAvenger function
     */
    bindEditAvenger(handler) {
        $("#admin-panel").on("click", "#save-button", (e) => {
            e.preventDefault();

            handler({name: $("#admin-avenger-name").val(), url: $("#admin-avenger-url").val(), clicks: $("#admin-avenger-clicks").val()});

            this._resetForm();
        });

    }
      
    /** binds to the controller's handleToggleAdmin function and closes the admin panel.
     * @param {*} handler handleToggleAdmin
     */
    bindCancel(handler) {
        $("#admin-panel").on("click", "#cancel-button", (e) => {
            e.preventDefault();

            handler();
            
            this._resetForm();
        });
    }

    /** binds to the controller's handleToggleAdmin function and opens the admin panel.
     * @param {*} handler handleToggleAdmin
     */
    bindToggleAdmin(handler) {
        $("#admin-toggler").on("click", "#admin-btn", function (e) {
            e.preventDefault();
    
            handler();

            $("#admin-toggler").toggleClass("d-none");
            $("#admin-panel").toggleClass("d-none");
        });
    }
}

export default View;