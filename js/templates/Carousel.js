import MediaFactory from '../factories/MediaFactory.js';

export default class Carousel {
    constructor(medias) {
        this.medias = medias;

        this.numero = 0;

        this.$mediaArray = [];

        this.sorter = [];

        let params = new URLSearchParams(window.location.search);
        this.searchParams = params.get('id');

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('carousel-wrapper');

        this.$modalWrapper = document.querySelector('.carousel-modal');
    }

    onCloseButton() {
        const $closeBtn = this.$wrapper.querySelector('.close-btn');

        $closeBtn.addEventListener('click', () => {
            document.body.classList.remove('no-scroll');

            this.$modalWrapper.classList.remove('d-show');
            this.$modalWrapper.removeChild(this.$wrapper);
            document.querySelector('.work_section').classList.remove('d-none');

        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.body.classList.remove('no-scroll');
                this.$modalWrapper.classList.remove('d-show');
                this.$modalWrapper.removeChild(this.$wrapper);
                document.querySelector('.work_section').classList.remove('d-none');

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
        const precedent = this.$wrapper.querySelector('#precedent');
        precedent.addEventListener('click', () => {
            if (this.medias) {
                this.changeSlide(-1);
            } else {
                this.changeSlide(-1, this.sorter);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                if (this.medias) {
                    this.changeSlide(-1);
                } else {
                    this.changeSlide(-1, this.sorter);
                }
            }
        });
    }

    onClickSuivant() {
        const suivant = this.$wrapper.querySelector('#suivant');
        suivant.addEventListener('click', () => {
            if (this.medias) {
                this.changeSlide(1);
            } else {
                this.changeSlide(1, this.sorter);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                if (this.medias) {
                    this.changeSlide(1);
                } else {
                    this.changeSlide(1, this.sorter);
                }
            }
        });
    }

    clearCarouselWrapper() {
        this.$modalWrapper.innerHTML = '';
    }

    keepFocusOnModal() {
        // add all the elements inside modal which you want to make focusable
        const focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = this.$modalWrapper.querySelector('#slider'); // select the modal by it's id
        console.log(modal);
        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


        document.addEventListener('keydown', function (e) {
            let isTabPressed = e.key === 'Tab';

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();
    }

    createCarousel(sorter, clickedId) {
        if (sorter && Array.isArray(sorter)) {
            this.sorter = sorter;
        }

        document.body.classList.add('no-scroll');

        const mediaArray = this.medias || this.sorter;

        mediaArray.forEach((elt, index) => {
            const media = new MediaFactory(elt);
            this.$mediaArray.push(media.createCarouselCard(media.domMedia));
            if (elt.id === clickedId) {
                this.numero = index;
            }
        });

        const carousel = `
          <div id="slider">
            <a href="#precedent" id="precedent" aria-label="Previous image"><i class="fa-sharp fa-solid fa-chevron-left"></i></a>
            ${this.$mediaArray[this.numero].outerHTML}
            <a href="#suivant" id="suivant" aria-label="Next image"><i class="fa-sharp fa-solid fa-chevron-right"></i></a>
            <a href="#closeCarousel" class="close-btn" aria-label="close dialog"><i class="fa-sharp fa-solid fa-xmark"></i><a>
          </div>
        `;
        this.$wrapper.innerHTML = carousel;

        this.$modalWrapper.classList.add('d-show');
        this.$modalWrapper.appendChild(this.$wrapper);

        this.onCloseButton();
        this.onClickPrecedent();
        this.onClickSuivant();
        this.keepFocusOnModal();
    }

    render() {
        this.createCarousel();
    }
}