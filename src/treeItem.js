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
        <div class="children-container"></div>
    <div>
`


class TreeItem extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow( {mode: 'open'} )
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.childrenVisible = false;
        this.treeChildren = []
    }

    toggleChildren = (event) => {
        event.stopPropagation()
        if (this.childrenVisible) {
            for (let child of this.treeChildren) {
                child.classList.add('invisible')
            }
            this.childrenVisible = false
            this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/right_arrow.svg')
        }
        else {
            for (let child of this.treeChildren) {
                child.classList.remove('invisible')
            }
            this.childrenVisible = true
            this._shadowRoot.querySelector('.toggle-button').setAttribute('src', 'imgs/down_arrow.svg')
        }
    }

    connectedCallback() {
        const rawData = JSON.parse(this.attributes.data.value)
        this.title = Object.keys(rawData)[0]
        this.data = rawData[this.title]
        this._shadowRoot.querySelector('#categoryName').innerHTML = `${this.title}`;
        this.treeChildren = [];
        if (typeof(this.data) === 'object') {
            for (let element of Object.keys(this.data)) {
                let childTree = document.createElement('tree-item');
                let childProps = {}
                childProps[element] = this.data[element]

                childTree.setAttribute('data', JSON.stringify(childProps))
                childTree.classList.add('invisible');
                this._shadowRoot.querySelector('.children-container').appendChild(childTree)
                this.treeChildren.push(childTree)
            }
            this._shadowRoot.querySelector('.toggle-button').addEventListener('click', this.toggleChildren)
        }
        else {
            // This element cant be nested, dont add click event and remove img
            this._shadowRoot.querySelector('.toggle-button').removeAttribute('src');
        }
    }
}

export default TreeItem;