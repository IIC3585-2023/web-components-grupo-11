let template = document.createElement('template')
template.innerHTML = `
    <li>
        <h3 id=categoryName></h3>
        <ul id=categoryList>
        </ul>
    </li>
`


class TreeItem extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow( {mode: 'open'} )
        this._shadowRoot.appendChild(template.content.cloneNode(true))
    }

    // static buildTree(currentData) {
    //     if (typeof currentData !== 'object') {
    //         return `
    //             <tree-item>
    //         `
    //     }

    //     const builtNodes = []
    //     for (element of currentData) {
    //         builtNodes.push(this.buildTree(element))
    //     }
    // }

    connectedCallback() {
        this.data = JSON.parse(this.attributes.data.value)
        // this.addEventListener('click', () => {
        //     console.log(this.data)
        // })
        const children = []
        for (let element of Object.keys(this.data)) {
            let childTree = document.createElement('tree-item')
            childTree.setAttribute('data', this.data[element])
            children.push(childTree)
        }
        console.log(children)
    }
}

export default TreeItem;