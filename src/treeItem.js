let template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            display: block
        }
        
        :host[hidden] {
            display: none;
        }

        .invisible {
            display: none;
        }

        .toggle-button {
            width: 1ch;
            height: 1ch;
            padding-left: 1ch;
            padding-bottom: 1.5ch;
            padding-right: 0.5ch;
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

        .header:hover {
            background-color: rgb(240,240,240);
        }
    </style>
    <div class="main-container">
        <div class="header">
            <div class="toggle-button">⮞</div>
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
            this._shadowRoot.querySelector('.toggle-button').innerHTML = '⮞'
        }
        else {
            this._shadowRoot.querySelector('.children-container').classList.remove('invisible');
            this.childrenVisible = true
            this._shadowRoot.querySelector('.toggle-button').innerHTML = '⮟'
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
                this._shadowRoot.querySelector('.toggle-button').innerHTML = '';
            }
        })
    }
}

export default TreeItem;