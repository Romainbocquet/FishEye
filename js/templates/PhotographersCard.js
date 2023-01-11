class PhotographersCard {
    constructor(photograph) {
        this._photograph = photograph
    }

    createPhotographCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photograph-card-wrapper')

        const photographCard = `
                <article>
                    <img
                        alt="${this._photograph.name}"
                        src="${this._photograph.portrait}"
                    />
                
            
                    <h2 class="fs-16 center">${this._photograph.name}</h2>
                    <p class="fs-14 center">
                        <span>${this._photograph.city}</span>
                        <span>${this._photograph.country}</span>
                        <span>${this._photograph.tagline}</span>
                        <span>${this._photograph.price}</span>
                    </p>
                </article>
        `
        
        $wrapper.innerHTML = photographCard
        return $wrapper
    }
}
