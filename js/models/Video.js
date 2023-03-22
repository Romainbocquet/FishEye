import Media from './Media.js';

export default class Video extends Media {
  constructor(media) {
    super(media);
    this._video = media.video;
    this._domMedia = this.domMedia;
    this._domMediaDisplay = this.domMediaDisplay;
  }

  get video() {
    let baseUrl = './assets/photographers/';
    return `${baseUrl}${this._photographerId}/${this._video}`;
  }

  get domMedia() {
    return `
    <video controls width="250">
      <source src="${this.video}" type="video/mp4" alt="${this.title}">
    </video>
    `;
  }

  get domMediaDisplay() {
    return `<video>                
      <source src="${this.video}" type="video/mp4" alt="${this.title}">
    </video>`;
  }
}

