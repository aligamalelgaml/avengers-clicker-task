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

export default View;