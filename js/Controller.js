class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // First-time page initialization:
        this.view.render(this.model.avengersList[this.model.currentAvengerID], this.model.avengersList); 

        // binding the model's onChange event to the controller:
        this.model.bindAvengerChanged(this.onAvengerChange);

        // binding the view's event to the controller:
        this.view.bindSelectAvenger(this.handleSelectAvenger);
        this.view.bindClickAvenger(this.handleAddClick);
        this.view.bindToggleAdmin(this.handleToggleAdmin);
        this.view.bindCancel(this.handleToggleAdmin);
        this.view.bindEditAvenger(this.handleEditAvenger)
    }
    
    /** Callback function that accepts a list of avengers and renders them, checks the admin flag in the model and renders the admin tools if the flag = true.
     */
    onAvengerChange = (avengers) => {
        this.view.render(avengers[this.model.currentAvengerID], avengers);

        if(this.model.admin) {
            this.view.renderAdminPanel(avengers[this.model.currentAvengerID]);
        }
    }

   /** Callback function that accepts the id of the newly selected avenger and renders them.
     */
    handleSelectAvenger = (id) => {
        this.model.selectAvenger(id);
    }

    /** Callback function that increments the model's number of clicks by 1.
     */
    handleAddClick = () => {
        this.model.addClicks();
    }

    /** Callback function that accepts the new (name, url, number of clicks) from the admin form and renders the changes.
     */
    handleEditAvenger = (avenger) => {
        this.model.editAvenger(avenger.name, avenger.url, avenger.clicks)
        this.handleToggleAdmin(); // Is it better for the controller to toggle the admin panel itself or should the model call it's internal function?
    }   

    /** Callback function that toggles the current admin flag.
     */
    handleToggleAdmin = () => {
        this.model.toggleAdmin()
    }
}

export default Controller;