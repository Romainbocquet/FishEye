import Carousel from '../templates/Carousel.js';

export default class Video {
  constructor(media) {
    this._id = media.id
    this._photographerId = media.photographerId
    this._title = media.title
    this._video = media.video
    this._likes = media.likes
    this._date = media.date
    this._price = media.price
  }

  get id() {
    return this._id
  }
  get photographerId() {
    return this._photographerId
  }
  get title() {
    return this._title
  }
  get video() {
    let baseUrl = "/assets/photographers/"
    return `${baseUrl}${this._photographerId}/${this._video}`
  }
  get likes() {
    return `${this._likes} <i class="fa-solid fa-heart"></i>`
  }
  get date() {
    return this._date
  }
  get price() {
    return this._price
  }

  createWorkCard(sorter) {
    const $wrapper = document.createElement('div')
    $wrapper.classList.add('work-card-wrapper')
    const workCard = `
        <article data-id="${this.id}">
            <video class="open">                
                <source src="${this.video}" type="video/mp4">
            </video>
            <div class="info-img">
                <h2 class="img-title">${this.title}</h2>
                <span id="img-like">${this.likes}</span>
            </div>
        </article>
    `

    $wrapper.innerHTML = workCard

    const $openCarousel = $wrapper.querySelector('.open')

    $openCarousel.addEventListener('click', () => {
      const carousel = new Carousel(sorter.media);
      carousel.createCarousel(sorter, this.id);
    })

    return $wrapper
  }


  createCorouselCard() {
    const $wrapper = document.createElement('div')
    $wrapper.classList.add('carousel-card-wrapper')
    const carouselCard = `
      <video controls width="250">
        <source src="${this.video}" type="video/mp4">
      </video>
      <h2 class="carrousel-media-title">${this.title}</h2>
    `
    $wrapper.innerHTML = carouselCard
    return $wrapper
  }
}

