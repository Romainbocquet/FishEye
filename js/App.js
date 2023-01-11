class App {
    constructor() {
        this.$moviesWrapper = document.querySelector('.photographer_section')
        this.photograph = new MovieApi('/data/photographers.json')
    }

    async main() {

        const photograph = await this.photograph.get()

        const Photograph = photograph.map(movie => new PhotographFactory(movie, 'photograph'))

        const PrintPhotograph = Photograph

        PrintPhotograph.forEach(movie => {
                const Template = new PhotographersCard(movie)
                this.$moviesWrapper.appendChild(
                    Template.createPhotographCard()
                )
        })
    }
}

const app = new App()
app.main()
