import PhotographApi from './api/Api.js';
import Photograph from './models/Photograph.js';
import PhotographersCard from './templates/PhotographersCard.js';

class App {
    constructor() {
        this.$photographContainer = document.querySelector('.photographer_section');
        this.photograph = new PhotographApi('/data/photographers.json');
    }

    async main() {

        const photograph = await this.photograph.get();
        
        photograph.forEach(photograph => {
                const photographer = new Photograph(photograph);
                const template = new PhotographersCard(photographer);
                this.$photographContainer.appendChild(
                    template.createPhotographCard()
                );
        });
    }
}

const app = new App();
app.main();
