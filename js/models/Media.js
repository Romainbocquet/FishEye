import Carousel from '../templates/Carousel.js';

export default class Media {
  constructor(media) {
    this._id = media.id;
    this._photographerId = media.photographerId;
    this._title = media.title;
    this._likes = media.likes;
    this._date = media.date;
    this._price = media.price;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return `${this._likes} <i class="fa-solid fa-heart"></i>`;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }

  createWorkCard(sorter, domMediaDisplay) {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('work-card-wrapper');
    $wrapper.dataset.id = this.id;
    const workCard = `
    
      <article data-id="${this.id}" class="work-article">
        <a href="#openCarousel" class="open" aria-label="${this.title}, closeup view">
          ${domMediaDisplay}
        </a>
        <div class="info-img">
          <h2 class="img-title">${this.title}</h2>
          <a href="#like" class="img-like" alt="likes"><span class="sr-only">Nombre de like :</span><span><div id="like-value">${this._likes}</div><i class="fa-regular fa-heart"></i></span></a>
        </div>
      </article>
    `;
    $wrapper.innerHTML = workCard;
  
    const $openCarousel = $wrapper.querySelector('.open');
    const $hearth = $wrapper.querySelector('.img-like');
    const $likeValue = $wrapper.querySelector('#like-value');
    const $hearthPicto = $wrapper.querySelector('.fa-heart'); 
    
    $hearth.addEventListener('click', () => {
      if ($hearth.classList.contains('liked')) {
        this._likes -= 1;
        $hearth.classList.remove('liked');
        $hearthPicto.classList.add('fa-regular');
        $hearthPicto.classList.remove('fa-solid');
      } else {
        this._likes += 1;
        $hearth.classList.add('liked');
        $hearthPicto.classList.remove('fa-regular');
        $hearthPicto.classList.add('fa-solid');
      }
      $likeValue.textContent = this._likes;
    });

   

    $openCarousel.addEventListener('click', () => {
      const carousel = new Carousel(sorter.media);
      carousel.createCarousel(sorter, this.id);
      document.querySelector('.work_section').classList.add('d-none');
    });

    $openCarousel.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const carousel = new Carousel(sorter.media);
        carousel.createCarousel(sorter, this.id);
        document.querySelector('.work_section').classList.add('d-none');
      }
    });

    return $wrapper;
  }  

  createCarouselCard(domMedia) {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('carousel-card-wrapper');
    const carouselCard = `
      ${domMedia}
      <h2 class="carrousel-media-title">${this.title}</h2>
    `;
    $wrapper.innerHTML = carouselCard;
    return $wrapper;
  }
}
