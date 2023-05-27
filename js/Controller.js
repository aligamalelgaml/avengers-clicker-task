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

export default Controller;