export default class PhotographersCard {
    constructor(photograph) {
        this._photograph = photograph
    }

    createPhotographCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photograph-card-wrapper')
        const photographCard = `
            <a href="photograph.html?id=${this._photograph.id}">
                <article>
                    <img
                        alt="${this._photograph.name}"
                        src="${this._photograph.portrait}"
                    />
                    <h2 class="">${this._photograph.name}</h2>
                    <p class="info">
                        <span id="location">${this._photograph.location}</span>
                        <span id="tagline">${this._photograph.tagline}</span>
                        <span id="price">${this._photograph.price}</span>
                    </p>
                </article>
            </a>
        `
        
        $wrapper.innerHTML = photographCard
        return $wrapper
    }

    createPhotographBanner() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photograph-work-wrapper')

        const photographCard = `
                <article class="photograph-work">
                    <div class="photograph-info">
                        <h2 class="">${this._photograph.name}</h2>
                        <p class="info">
                            <span id="location">${this._photograph.location}</span>
                            <span id="tagline">${this._photograph.tagline}</span>
                        </p>
                    </div>
                    <button class="contact-button">Contactez-moi</button>
                    <img
                        alt="${this._photograph.name}"
                        src="${this._photograph.portrait}"
                    />
                </article>
        `
        
        $wrapper.innerHTML = photographCard
        return $wrapper
    }
}
