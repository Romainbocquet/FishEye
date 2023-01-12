import PhotographApi from "./api/Api.js";
import WorksApi from "./api/ApiWork.js";
import Photograph from "./models/Photograph.js";
import PhotographersCard from "./templates/PhotographersCard.js";
import MediaFactory from "./factories/MediaFactory.js";
import Work from "./models/Work.js";
import WorkCard from "./templates/WorkCard.js";




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
                    template.createPhotographCard2()
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

        //const photo = work.map(work => new MediaFactory(work, 'photo'))
        //const video = work.map(work => new MediaFactory(work, 'video'))

        let params = new URLSearchParams(window.location.search)
        let searchParams = params.get('id')

        work.forEach(work => {
            if(work.photographerId == searchParams){
                if(work.video == undefined) {
                    const works = new Work(work)
                    const template = new WorkCard(works)
                    this.$workContainer.appendChild(
                        template.createWorkCardPhoto()
                    )
                }
                else if(work.video !== undefined) {
                    const works = new Work(work)
                    const template = new WorkCard(works)
                    this.$workContainer.appendChild(
                        template.createWorkCardVideo()
                    )
                }
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

