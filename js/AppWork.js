import PhotographApi from "./api/Api.js";
import WorksApi from "./api/ApiWork.js";
import Photograph from "./models/Photograph.js";
import PhotographersCard from "./templates/PhotographersCard.js";
import MediaFactory from "./factories/MediaFactory.js";

class AppWork {
    constructor() {
        this.$photographContainer = document.querySelector('.photograph_desc_section')
        this.photograph = new PhotographApi('/data/photographers.json')
    }
    async main() {

        const photograph = await this.photograph.get()
        
        let params = new URLSearchParams(window.location.search)
        let searchParams = params.get('id')

        photograph.forEach(photograph => {
            if(photograph.id == searchParams){
                const photographer = new Photograph(photograph)
                const template = new PhotographersCard(photographer)
                this.$photographContainer.appendChild(
                    template.createPhotographBanner()
                )
            } else {
                return false
            }
        })
    }
}

class AppWorkMedia {
    constructor() {
        this.$workContainer = document.querySelector('.work_section')
        this.work = new WorksApi('/data/photographers.json')
    }
    async mainWork() {
        const work = await this.work.getWorks()

        let params = new URLSearchParams(window.location.search)
        let searchParams = params.get('id')

        work.forEach(work => {
            if(work.photographerId == searchParams){
                const works = new MediaFactory(work)
                this.$workContainer.appendChild(
                    works.createWorkCard()
                )
            } else {
                return false
            }
        })
    }
}
const appMedia = new AppWorkMedia()
appMedia.mainWork()

const appWork = new AppWork()
appWork.main()

