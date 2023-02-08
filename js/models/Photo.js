export default class Photo{
  constructor(media) {
    this._id = media.id
    this._photographerId = media.photographerId
    this._title = media.title
    this._image = media.image
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
  get image() {
    let baseUrl = "/assets/photographers/"
    return `${baseUrl}${this._photographerId}/${this._image}`
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

  createWorkCard() {
    const $wrapper = document.createElement('div')
    $wrapper.classList.add('work-card-wrapper')
    const workCard = `
            <article data-id="${this.id}">
                <img
                    alt="${this.title}"
                    src="${this.image}"
                />
                <div class="info-img">
                    <h2 class="img-title">${this.title}</h2>
                    <span id="img-like">${this.likes}</span>
                </div>
            </article>
    `
    $wrapper.innerHTML = workCard
    return $wrapper
  }
}