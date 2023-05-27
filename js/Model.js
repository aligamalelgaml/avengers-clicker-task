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

export default Model;