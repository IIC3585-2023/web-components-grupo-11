import { LitElement, html, css } from "lit-element";

class CustomCard extends LitElement {
    static get properties() {
        return {
            description: {type: String},
            title: {type: String},
            info: {type: String},
            count: {type: Number}
        }
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
                border-style: solid;
                border-radius: 5px;
                width: 25%;
                box-shadow: 10px 10px 5px gray;
                padding: 15px;
                margin: 10px;
            }
            .content {
                width: 100%;
            }
            .footer {
                border-style: solid;
                border-color: gray;
                border-width: 1px;
                padding: 5px;
            }
        `
    }

    constructor (title, description, info) {
        super();
        this.description = description || 'Sample description';
        this.title = title || 'Sample Title';
        this.info = info || 'Sample info';
        this.count = 0;
    }

    render () {
        return html`
            <div class='box'>
                <h1>${this.title}</h1>
                <div class='content'>
                    <p>${this.description}</p>
                </div>
                <div class='footer'>
                    <p>${this.info}</p>
                    <button @click=${this.clickButton}>Click!</button>
                    <p>Count is ${this.count}</p>
                </div>
            </div>
        `
    }
    clickButton () {
        this.count += 1;
    }
}

export default CustomCard;