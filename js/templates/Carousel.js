import MediaFactory from "../factories/MediaFactory.js";

export default class Carousel {
    constructor(medias) {
        this.medias = medias

        this.numero = 0

        this.$mediaArray = []

        this.sorter = []

        let params = new URLSearchParams(window.location.search)
        this.searchParams = params.get('id')

        this.$wrapper = document.createElement('div')
        this.$wrapper.classList.add('carousel-wrapper')

        this.$modalWrapper = document.querySelector('.carousel-modal')
    }

    onCloseButton() {
        const $closeBtn = this.$wrapper.querySelector('.close-btn');
        $closeBtn.addEventListener('click', () => {
          document.body.classList.remove('no-scroll');
      
          this.$modalWrapper.classList.remove('d-show');
          this.$modalWrapper.removeChild(this.$wrapper);
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                document.body.classList.remove('no-scroll');
                this.$modalWrapper.classList.remove('d-show');
                this.$modalWrapper.removeChild(this.$wrapper);
            }
        });
      }

    changeSlide(sens, sorter) {
        this.numero += sens;

        if (this.numero < 0) {
            this.numero = this.$mediaArray.length - 1;
        }

        if (this.numero > this.$mediaArray.length - 1) {
            this.numero = 0;
        }
        this.clearCarouselWrapper();

        // check if sorter is defined and use it to create the carousel
        if (sorter) {
            this.createCarousel(sorter);
        } else {
            this.createCarousel();
        }
    }


    onClickPrecedent() {
        const precedent = this.$wrapper.querySelector("#precedent")
        precedent.addEventListener('click', () => {
            if (this.medias) {
                this.changeSlide(-1);
            } else {
                this.changeSlide(-1, this.sorter);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowLeft") {
                if (this.medias) {
                    this.changeSlide(-1);
                } else {
                    this.changeSlide(-1, this.sorter);
                }
            }
        });
    }

    onClickSuivant() {
        const suivant = this.$wrapper.querySelector("#suivant");
        suivant.addEventListener('click', () => {
            if (this.medias) {
                this.changeSlide(1);
            } else {
                this.changeSlide(1, this.sorter);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowRight") {
                if (this.medias) {
                    this.changeSlide(1);
                } else {
                    this.changeSlide(1, this.sorter);
                }
            }
        });
    }

    clearCarouselWrapper() {
        this.$modalWrapper.innerHTML = ""
    }

    createCarousel(sorter, clickedId) {
        if (sorter && Array.isArray(sorter)) {
            this.sorter = sorter;
        }

        document.body.classList.add('no-scroll');

        const mediaArray = this.medias || this.sorter;

        mediaArray.forEach((media, index) => {
            const medias = new MediaFactory(media)
            this.$mediaArray.push(medias.createCorouselCard());
            if (media.id === clickedId) { // check if the current media id matches the clicked id
                this.numero = index; // set the carousel index to the current media index
            }
        });

        const carousel = `
          <div id="slider">
            <div id="precedent"><i class="fa-sharp fa-solid fa-chevron-left"></i></div>
            ${this.$mediaArray[this.numero].outerHTML}
            <div id="suivant"><i class="fa-sharp fa-solid fa-chevron-right"></i></div>
            <div class="close-btn"><i class="fa-sharp fa-solid fa-xmark"></i><div>
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