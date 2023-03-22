import ProxyRatingSorter from '../proxy/ProxyRatingSorter.js';
import MediaFactory from '../factories/MediaFactory.js';

export default class SorterForm {
    constructor(media) {
        this.media = media;

        this.$wrapper = document.createElement('div');
        this.$sorterFormWrapper = document.querySelector('.filter_section');
        this.$mediaWrapper = document.querySelector('.work_section');

        this.ProxyRatingSorter = new ProxyRatingSorter();
    }

    async sorterMedia(sorter) {
        this.clearMediaWrapper();

        if (sorter) {

            const sortedData = await this.ProxyRatingSorter.sorter(this.media, sorter);

            const sortedMedia = sortedData.media ;

            sortedMedia.forEach(work => {
                    const works = new MediaFactory(work);
                    this.$mediaWrapper.appendChild(
                        works.createWorkCard(sortedMedia, works.domMediaDisplay)
                    );
            });
        } else {
            this.media.forEach(work => {
                const works = new MediaFactory(work);
                this.$workContainer.appendChild(
                    works.createWorkCard(this.media, works.domMediaDisplay)
                );
            });
        }
    }

    onChangeSorter() {
        this.$wrapper
            .querySelector('.option-container')
            .addEventListener('click', e => {
                const sorter = e.target.getAttribute('sorter');
                this.sorterMedia(sorter);
            });
    }

    onClickSelect(){
        const select = this.$wrapper.querySelector('.select');
        const selectContainer = this.$wrapper.querySelector('.select-container');
        const option = this.$wrapper.querySelectorAll('.select-container .option');
        const optionContainer = this.$wrapper.querySelector('.option-container');
        const input = this.$wrapper.querySelector('#input');

        select.addEventListener('click', e => {
            e.preventDefault();
            selectContainer.classList.toggle('active');
            optionContainer.classList.toggle('d-none');
        });

        select.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                selectContainer.classList.toggle('active') ;
                optionContainer.classList.toggle('d-none');
            }
        });
        
        option.forEach( e => {
            e.addEventListener('click', () => {
                input.value = e.innerText;
                selectContainer.classList.toggle('active') ;
                optionContainer.classList.toggle('d-none');
                selectContainer.classList.remove('active');
                option.forEach( e => {
                    e.classList.remove('selected');
                });
                e.classList.add('selected');
            });
        });
    }

    clearMediaWrapper() {
        this.$mediaWrapper.innerHTML = '';
    }

    // Dans la méthode render() de la classe SorterForm :

render() {
    const sorterForm = `
        <h4 for="custom-select" id="label-select">Trier par</h4>
        <form class="select-container">
            <div class="select">
                <label class="d-none" for="input">Filtres</label>
                <input type="text" name="custom-select" id="input" placeholder="Filtres" alt="order by">
            </div>
            <div class="option-container d-none">
                <a class="option" sorter="title" href="#title" alt="trier par titre">
                    <label sorter="title">Titre</label>
                </a>
                <a class="option" sorter="date" href="#date" alt="trier par date">
                    <label sorter="date">Date</label>
                </a>
                <a class="option" sorter="like" href="#like" alt="trier par nombre de like">
                    <label sorter="like">Popularité</label>
                </a>
            </div>
        </form>
    `;

    this.$wrapper.innerHTML = sorterForm;
    this.onChangeSorter();
    this.onClickSelect();

    // Désactiver le comportement par défaut du champ de saisie de texte
    const form = this.$wrapper.querySelector('.select-container');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    this.$sorterFormWrapper.appendChild(this.$wrapper);
}

}