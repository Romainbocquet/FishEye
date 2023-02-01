export default class Video{
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
    if(this._photographerId == 527) {
      return `${baseUrl}Nabeel/${this._video}`
    }
    if(this._photographerId == 243) {
      return `${baseUrl}Mimi/${this._video}`
    }
    if(this._photographerId == 930) {
      return `${baseUrl}Ellie Rose/${this._video}`
    }
    if(this._photographerId == 82) {
      return `${baseUrl}Tracy/${this._video}`
    }
    if(this._photographerId == 925) {
      return `${baseUrl}Rhode/${this._video}`
    }
    if(this._photographerId == 195) {
      return `${baseUrl}Marcel/${this._video}`
    }
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
            <article>
                <video>                
                    <source src="${this.video}" type="video/mp4">
                </video>
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

