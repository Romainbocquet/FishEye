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
    if(this._photographerId == 527) {
      return `http://127.0.0.1:5500/assets/photographers/Nabeel/${this._video}`
    }
    if(this._photographerId == 243) {
      return `http://127.0.0.1:5500/assets/photographers/Mimi/${this._video}`
    }
    if(this._photographerId == 930) {
      return `http://127.0.0.1:5500/assets/photographers/Ellie Rose/${this._video}`
    }
    if(this._photographerId == 82) {
      return `http://127.0.0.1:5500/assets/photographers/Tarcy/${this._video}`
    }
    if(this._photographerId == 925) {
      return `http://127.0.0.1:5500/assets/photographers/Rhode/${this._video}`
    }
    if(this._photographerId == 195) {
      return `http://127.0.0.1:5500/assets/photographers/Marcel/${this._video}`
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
}

