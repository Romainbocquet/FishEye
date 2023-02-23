import ProxyRatingSorter from "../proxy/ProxyRatingSorter.js";
import MediaFactory from "../factories/MediaFactory.js";

export default class SorterForm {
    constructor(media) {
        this.media = media

        this.$wrapper = document.createElement('div')
        this.$sorterFormWrapper = document.querySelector('.filter_section')
        this.$mediaWrapper = document.querySelector('.work_section')

        this.ProxyRatingSorter = new ProxyRatingSorter()
    }

    async sorterMedia(sorter) {
        this.clearMediaWrapper()

        if (!!sorter) {

            const sortedData = await this.ProxyRatingSorter.sorter(this.media, sorter)

            const sortedMedia = sortedData.media 

            sortedMedia.forEach(work => {
                    const works = new MediaFactory(work)
                    this.$mediaWrapper.appendChild(
                        works.createWorkCard(sortedMedia)
                    )
            })
        } else {
            this.media.forEach(work => {
                const works = new MediaFactory(work)
                this.$workContainer.appendChild(
                    works.createWorkCard(this.media)
                )
            })
        }
    }

    onChangeSorter() {
        this.$wrapper
            .querySelector('.option-container')
            .addEventListener('click', e => {
                const sorter = e.target.getAttribute("sorter")
                this.sorterMedia(sorter)
            })
    }

    onClickSelect(){
        const select = this.$wrapper.querySelector('.select');
        const selectContainer = this.$wrapper.querySelector(".select-container");
        const option = this.$wrapper.querySelectorAll(".select-container .option")
        const input = this.$wrapper.querySelector("#input");

        select.addEventListener('click', e => {
            selectContainer.classList.toggle("active")
        })
        option.forEach( e => {
            e.addEventListener("click", () => {
                input.value = e.innerText;
                    selectContainer.classList.remove("active");
                    option.forEach( e => {
                        e.classList.remove("selected")
                    });
                e.classList.add("selected")
            })
        });
    }

    clearMediaWrapper() {
        this.$mediaWrapper.innerHTML = ""
    }

    render() {
        const sorterForm = `
            <label for="custom-select" id="label-select">Trier par</label>
            <form class="select-container">
                <div class="select">
                    <input type="text" name="custom-select" id="input" placeholder="Filtres">
                </div>
                <div class="option-container">
                    <div class="option" sorter="title">
                        <label sorter="title">Titre</label>
                    </div>
                    <div class="option" sorter="date">
                        <label sorter="date">Date</label>
                    </div>
                    <div class="option" sorter="like">
                        <label sorter="like">Popularité</label>
                    </div>
                </div>
            </form>
        `

        this.$wrapper.innerHTML = sorterForm
        this.onChangeSorter()
        this.onClickSelect()

        this.$sorterFormWrapper.appendChild(this.$wrapper)
    }
}