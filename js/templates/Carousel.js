export default class carouselModal {
    constructor(media) {
        this.media = media

        this.numero = 0

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('carousel-wrapper')

        this.$modalWrapper = document.querySelector('.carousel-modal')
    }

    onCloseButton() {
        this.$wrapper
            .querySelector('.close-btn')
            .addEventListener('click', () => {
                this.$modalWrapper.classList.remove('d-show')
                this.$wrapper.innerHTML = ""
            })
    }

    onClickOpenCarousel(elt) {
        elt.addEventListener('click', () => {
            const Player = new carouselModal(this)
            Player.render()
        })
    }
    
    changeSlide(sens) {
        let mediaArray = []
        this.media.forEach(media => {
            if (media.video !== undefined) {
                mediaArray.push(media.video)
            } else if (media.video == undefined) {
                mediaArray.push(media.image)
            }
        })
        this.numero += sens;
        console.log(this.numero);

        if (this.numero < 0) {
            this.numero = mediaArray.length - 1;
        }

        if (this.numero > mediaArray.length - 1) {
            this.numero = 0;
        }
        this.$wrapper.querySelector("#slide").src = "/assets/photographers/243/" + mediaArray[this.numero];
    }

    onClickPrecedent() {
        const precedent = this.$wrapper.querySelector("#precedent")
        precedent.addEventListener('click', () => {
            this.changeSlide(-1);
        })
    }

    onClickSuivant() {
        const precedent = this.$wrapper.querySelector("#suivant")
        precedent.addEventListener('click', () => {
            this.changeSlide(1);
        })
    }

    createCarousel() {
        const carousel = `
        <div id="slider">
            <img src="/assets/photographers/243/Animals_Rainbow.jpg" id="slide" width="200px">
            <div id="precedent"><</div>
            <div id="suivant">></div>
            <div class="close-btn">Close Modal<div>
        </div>
        `
        this.$wrapper.innerHTML = carousel

        this.$modalWrapper.classList.add('d-show')
        this.$modalWrapper.appendChild(this.$wrapper)

        this.onCloseButton()
        this.onClickPrecedent()
        this.onClickSuivant()

    }

    render() {
        this.createCarousel()
    }
}