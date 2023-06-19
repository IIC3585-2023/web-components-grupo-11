let template = document.createElement('template')
template.innerHTML = `
    <style>
        .invisible {
            display: none;
        }

        .toggle-button {
            width: 10px;
            height: 10px;
            padding: 10px;
        }

        .header {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 5px;
        }

        #categoryName {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .children-container {
            padding-left: 30px;
            padding-top: 3px;
            padding-bottom: 3px;
            padding-right: 3px;
        }

        .main-container {
            // border: 2px solid gray;
            // border-radius: 5px;
            background-color: rgb(245,245,245);
        }
    </style>
    <div class="main-container">
        <div class="header">
            <img class="toggle-button" src='imgs/right_arrow.svg'>
            <h3 id="categoryName"></h3>
        </div>
        <div class="children-container">
            <slot id="slotContent"></slot>
        </div>
    </div>
`


class TreeItem extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow( {mode: 'open'} )
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.childrenVisible = false;
    }

    toggleChildren = (event) => {
        event.stopPropagation()
        if (this.childrenVisible) {
            this._shadowRoot.querySelector('.children-container').classList.add('invisible');
            this.childrenVisible = false
            this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/right_arrow.svg')
        }
        else {
            this._shadowRoot.querySelector('.children-container').classList.remove('invisible');
            this.childrenVisible = true
            this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/down_arrow.svg')
        }
    }

    connectedCallback() {
        // Setting timeout so slotted content can load
        setTimeout( () => {
            // First, remove empty text elements.
            let elementsToRemove = []
            for (const node of this._shadowRoot.querySelector('#slotContent').assignedNodes()) {
                if ((node instanceof Text) && (node.textContent.trim().length === 0)) {
                    elementsToRemove.push(node)
                } 
            }
            for (const node of elementsToRemove) {
                node.remove();
            }

            // First child will be the title.
            let firstChild = this._shadowRoot.querySelector('#slotContent').assignedNodes()[0]
            if (firstChild instanceof Text) {
                const title = firstChild.textContent.trim();
                this._shadowRoot.querySelector('#categoryName').innerHTML = title
                firstChild.remove();
            }
            else {
                const title = firstChild;
                this._shadowRoot.querySelector('#categoryName').appendChild(title);
            }
            // At the start, every child will be hidden.
            this._shadowRoot.querySelector('.children-container').classList.add('invisible');
            if (this._shadowRoot.querySelector('#slotContent').assignedNodes().length > 0) {
                // If we have more nested content, we add the click listener to display children.
                this._shadowRoot.querySelector('.toggle-button').addEventListener('click', this.toggleChildren)
            }
            else {
                // Else, we remove the arrow image.
                this._shadowRoot.querySelector('.toggle-button').removeAttribute('src');
            }
        })
    }
}

export default TreeItem;