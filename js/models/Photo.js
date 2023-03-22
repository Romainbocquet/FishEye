import Media from './Media.js';

export default class Photo extends Media {
  constructor(media) {
    super(media);
    this._image = media.image;
    this._domMedia = this.domMedia;
    this._domMediaDisplay = this.domMediaDisplay;
  }

  get image() {
    let baseUrl = './assets/photographers/';
    return `${baseUrl}${this._photographerId}/${this._image}`;
  }

  get domMedia() {
    return `
      <img src="${this.image}" id="slide" alt="${this.title}">
    `;
  }

  get domMediaDisplay() {
    return `
        <img
          alt="${this.title}"
          src="${this.image}"
        />
    `;
  } 
}