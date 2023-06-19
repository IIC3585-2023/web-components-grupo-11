let template = document.createElement('template');
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
        <div class="children-container"></div>
    <div>
`;

class TreeItem extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.childrenVisible = false;

        this.treeChildren = [];
    }

    toggleChildren = (event) => {
        event.stopPropagation();

        if (this.childrenVisible) {
            for (let child of this.treeChildren) {
                child.classList.add('invisible');
            }
            this.childrenVisible = false;
            this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/right_arrow.svg');
        } else {
            for (let child of this.treeChildren) {
                child.classList.remove('invisible');
            }
            this.childrenVisible = true;
            this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/down_arrow.svg');
        }
    }

    connectedCallback() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const name = this.textContent.trim().split(/\r?\n/)[0];
                    this.title = name;
                    this._shadowRoot.querySelector('#categoryName').innerHTML = `${name}`;

                    if (this.children.length !== 0) {
                        this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/right_arrow.svg');
                        const childItems = Array.from(this.children);

                        // Append each child item to the current tree-item
                        childItems.forEach((childItem) => {
                            // childItem.classList.add('invisible');
                            this._shadowRoot.querySelector('.children-container').appendChild(childItem);
                        });

                        this.treeChildren = Array.from(this._shadowRoot.querySelectorAll('.children-container > tree-item'));
                        this._shadowRoot.querySelector('.toggle-button').addEventListener('click', this.toggleChildren);
                    } else if (this.treeChildren.length === 0) {
                        // This element can't be nested, don't add click event and remove img
                        // this._shadowRoot.querySelector('.toggle-button').removeAttribute('src')
                        this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='); // Set src to empty string
                    }
                    break; // Stop observing once the children are added
                }
            }
        });

        observer.observe(this, { childList: true });
    }
}

customElements.define('tree-item', TreeItem);