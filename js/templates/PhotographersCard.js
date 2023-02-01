export default class PhotographersCard {
    constructor(photograph) {
        this._photograph = photograph

        this.$wrapperPhotographCard = document.createElement('div')
        this.$wrapperPhotographCard.classList.add('photograph-card-wrapper')

        this.$wrapperPhotographBanner = document.createElement('div')
        this.$wrapperPhotographBanner.classList.add('photograph-banner-wrapper')

    }

    createPhotographCard() {
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
        
        this.$wrapperPhotographCard.innerHTML = photographCard
        return this.$wrapperPhotographCard
    }

    openContactModal(){
        const buttonOpen = this.$wrapperPhotographBanner.querySelector('.contact-button');
        const contactModal = this.$wrapperPhotographBanner.querySelector(".modal-contact");
        const buttonClose = this.$wrapperPhotographBanner.querySelector(".close-contact");

        buttonOpen.addEventListener('click', e => {
            contactModal.classList.add("open")
        })
        buttonClose.addEventListener('click', e => {
            contactModal.classList.remove("open")
        })
    }

    regExEmail(value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    regExNomPrenom(value) {
        return /^[A-Za-z]{2,20}$/.test(value);
    }

    regExMessage(value) {
        return /^[A-Za-z0-9]{1,5000}$/.test(value);
    }

    testMail(mail){
        let emailError = this.$wrapperPhotographBanner.querySelector('#email-error');

        if (this.regExEmail(mail)) {
            emailError.classList.remove("d-show");
            return true;
        } else {
            emailError.classList.add("d-show");
            return false;
        }
    }

    testNom(nom){
        let nomError = this.$wrapperPhotographBanner.querySelector('#nom-error');

        if (this.regExNomPrenom(nom)) {
            nomError.classList.remove("d-show");
            return true;
        } else {
            nomError.classList.add("d-show");
            return false;
        }
    }

    
    testPrenom(prenom){
        let prenomError = this.$wrapperPhotographBanner.querySelector('#prenom-error');

        if (this.regExNomPrenom(prenom)) {
            prenomError.classList.remove("d-show");
            return true;
        } else {
            prenomError.classList.add("d-show");
            return false;
        }
    }

    testMessage(message){
        let messageError = this.$wrapperPhotographBanner.querySelector('#message-error');

        if (this.regExMessage(message)) {
            messageError.classList.remove("d-show");
            return true;
        } else {
            messageError.classList.add("d-show");
            return false;
        }
    }

    envoyerContactModal(){
        let contactModal = this.$wrapperPhotographBanner.querySelector(".modal-contact");
        let buttonEnvoyer = this.$wrapperPhotographBanner.querySelector('#send-button');
        let nomValue = this.$wrapperPhotographBanner.querySelector('#nom');
        let prenomValue = this.$wrapperPhotographBanner.querySelector('#prenom');
        let emailValue = this.$wrapperPhotographBanner.querySelector('#email');
        let messageValue = this.$wrapperPhotographBanner.querySelector('#message');
        const contactForm = [];

        buttonEnvoyer.addEventListener('click', e => {
            this.testMail(emailValue.value)
            this.testNom(nomValue.value)
            this.testPrenom(prenomValue.value)
            this.testMessage(messageValue.value)
            if (this.testMail(emailValue.value) && this.testNom(nomValue.value) && this.testPrenom(prenomValue.value)) {
                contactModal.classList.remove("open");
                contactForm.push(nomValue.value);
                contactForm.push(prenomValue.value);
                contactForm.push(emailValue.value);
                contactForm.push(messageValue.value);
                console.log(contactForm);
            }
        })
    }

    createPhotographBanner() {
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
                <div class="modal-contact">
                    <form>
                        <div class="close-contact">X</div>
                        <h3 for="">Contactez-moi <br>${this._photograph.name}</h3>
                        <label for="name">Prénom *</label>
                        <input type="text" name="name" id="prenom" required>
                        <p id="prenom-error">Prénom incorrect</p>
                        <label for="last-name">Nom *</label>
                        <input type="text" name="last-name" id="nom" required>
                        <p id="nom-error">Nom incorrect</p>
                        <label for="mail">Email *</label>
                        <input type="email" name="" id="email" required>
                        <p id="email-error">Email incorrect</p>
                        <label for="message">Votre message *</label>
                        <input type="text" name="message" id="message" required>
                        <p id="message-error">Veuillez renseigner un massage</p>
                        <input type="button" value="Envoyer" id="send-button" onclick="">
                    </form>
                </div>
        `
        
        this.$wrapperPhotographBanner.innerHTML = photographCard
        this.openContactModal()
        this.envoyerContactModal()

        return this.$wrapperPhotographBanner
    }
}
