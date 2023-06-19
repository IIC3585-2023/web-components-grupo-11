import { LitElement, html, css } from "lit-element";

class CustomCard extends LitElement {
    static get properties() {
        return {
            description: {type: String},
            title: {type: String},
            info: {type: String},
            count: {type: Number},
            product_name: {type: String},
            normal_price: {type: String},
            discount: {type: Boolean},
            discount_price: {type: String},
            discount_percentage: {type: String},
            image_url: {type: String},
            brand: {type: String},
            marketplace: {type: String},
            event_name: {type: String},
            action_text: {type: String},
            rating: {type: Number},
            id: {type: Number}
        }
    }

    constructor (title, description, info, image_url, brand, product_name, marketplace, normal_price, discount, discount_price, discount_percentage, action_text, event_name, rating, id) {
        super();
        this.description = description || 'Sample description';
        this.title = title || 'Sample Title';
        this.info = info || 'Sample info';
        this.count = 0;
        this.image_url = image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
        this.brand = brand || 'Sample Brand';
        this.product_name = product_name || 'Sample Product Name';
        this.marketplace = marketplace || 'Sample Marketplace';
        this.normal_price = normal_price || '0';
        this.discount = discount || false;
        this.discount_price = discount_price || normal_price;
        this.discount_percentage = discount_percentage || '0%';
        this.action_text = action_text || 'Comprar';
        this.event_name = event_name || '';
        this.rating = rating || 0;
        this.id = id || -1;
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }
            :host[hidden] {
                display: none;
            }
            .box {
                margin: 10px;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
            }
            .content {
                padding-left: 15px;
                padding-right: 15px;
                padding-bottom: 15px
            }
            .box:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
            .box img {
                width: 100%;
                height: 10%;
                object-fit: cover;
                position: relative;
            }

            .itemName {
                font-weight: bold;
                color: #4A4A4A;
                font-size:1vw;
                margin-top: 2%;
                font-family: Lato,sans-serif;
            }

            .brandName {
                color: #767676;
                font-family: Lato,sans-serif;
                margin: 0px;
                font-size:0.8vw;
                margin-top: 5%;
            }

            .marketplaceName {
                margin-top: 2%;
                font-family: Lato,sans-serif;
                font-size:0.6vw;
            }
            
            .normalPrice{
                font-weight: 400;
                margin-top: 5%;
                margin-left: 1%;
                font-size: 1vw;
                font-family: Lato,sans-serif;
                color: #717171;
            }

            .discountContent {
                margin-top: 5%;
                margin-left: 1%;
                display: inline-block
            }
            
            .discountPrice{
                font-weight: 400;
                font-size: 1vw;
                font-family: Lato,sans-serif;
                color: #e4022d;
                float: left;
            }

            .discountPercentage {
                font-weight: 400;
                font-size: 0.9vw;
                font-family: Lato,sans-serif;
                color: #FFFFFF;
                float: left;
                margin-left: 10px;
                background-color: #e4022d;
                border-radius: 5px;
                padding-left: 5px;
                padding-right: 3px;
            }

            .actionButton {
                width: 100%;
                height: 30px;
                text-align: center;
                position: relative;
                bottom: 0;
                background-color: #FF6200;
                font-family: Lato,sans-serif;
                border: 0px;
                border-radius: 5px;
                margin-top: 5%;
            }

            .actionButton:hover{
                cursor: pointer;
            }
            .clip-star-checked {
                background: gold;
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                display: inline-block;
                height: 30px;
                width: 30px;
            }
            .clip-star-unchecked {
                background: #606060;
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                display: inline-block;
                height: 30px;
                width: 30px;
            }

            .rating {
                margin-top: 5px;
            }

            @media only screen and (max-width: 1024px)  {
            .discountPercentage {
                /* font-size: 0.9rem; */
                font-size: 2.7rem;
            }

            .discountPrice{
                /* font-size: 1rem; */
                font-size: 3rem;
            }

            .itemName {
                /* font-size:1rem; */
                font-size: 3rem;
            }

            .brandName {
                /* font-size:0.8rem; */
                font-size: 2.4rem
            }

            .marketplaceName {
                /* font-size:0.6rem; */
                font-size: 1.8rem;
            }
            
            .normalPrice{
                /* font-size: 1rem; */
                font-size: 3rem;
            }

            .clip-star-checked, .clip-star-unchecked {
                height: 5rem;
                width: 5rem
            }

            .actionButton {
                height: 3.5rem;
                font-size: 2.5rem;
            }
        }
        `
    }

    getItemPrices(){
        if(this.discount){
            return html`
                    <div class="discountContent">
                        <div class="discountPrice">
                            $ ${this.discount_price}
                        </div>
                        <div class="discountPercentage">
                            - ${this.discount_percentage} 
                        </div>
                    </div>
                    <div class="normalPrice" style="margin-top: 1%">
                        $ ${this.normal_price}
                    </div>
        `   
        }
        return html`
                    <div class="normalPrice">
                        $ ${this.normal_price}
                    </div>
        `
    }

    getRating(){
        const amount = Math.min(Math.max(0, Math.floor(this.rating)), 5)
        console.log(amount)
        const ratingTemplate = [];
        for(let i = 0; i < amount; i++){
            ratingTemplate.push(html`<div class="clip-star-checked"></div>`)
        }
        for(let i = 0; i < 5- amount; i++){
            ratingTemplate.push(html`<div class="clip-star-unchecked"></div>`)
        }
        return html`
          ${ratingTemplate}`
    }

    emitEvent(){
        let event = new CustomEvent(this.event_name, {
            bubbles: true,
            composed: true,
            detail: {
              message: `Emitted ${this.event_name} event from ${this.action_text} action in component`,
              id: this.id
            }
        });
        this.dispatchEvent(event);
        console.log(`Emitted ${this.event_name} event from ${this.action_text} action in component`)
    }

    render () {
        return html`
            <div class='box'>
                <img src=${this.image_url} alt="item image">
                <div class='content'>
                    <div class='brandName'>
                        ${this.brand}
                    </div>
                    <div class='itemName'>
                        ${this.product_name}
                    </div>
                    <div class='marketplaceName'>
                        Por ${this.marketplace}
                    </div>
                    ${this.getItemPrices()}
                    <div class="rating">
                        ${this.getRating()}
                    </div>
                    <button class="actionButton" @click="${this.emitEvent}" type="button">${this.action_text}</button>
                </div>
            </div>
        `
    }
    clickButton () {
        this.count += 1;
    }
}

export default CustomCard;