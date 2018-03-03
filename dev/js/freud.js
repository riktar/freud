class Freud {
    /**
     * Costruttore
     * @param elem
     */
    constructor() {
        // Params
        this._el = document.getElementById('freud')
        this._nodes = {}

        // Events
    }

    /**
     * Start from the first quote
     */
    start() {
        this.do("start")
    }

    /**
     * Do a quote
     * @param key
     */
    do(key) {
        if (this._nodes.hasOwnProperty(key)) {
            let node = this._nodes[key]
            this.createQuoteBot(node)
        } else {
            // error :(
        }
    }

    /**
     * Create a quote from the bot
     * @param node
     */
    createQuoteBot(node) {
        let self = this
        window.setTimeout(function () {
            let quote = document.createElement('div')
            quote.classList.add('freud-quote','__bot')
            let sentence = document.createElement('div')
            sentence.classList.add('freud-sentence')

            quote.appendChild(sentence)

            self._el.appendChild(quote)

            node.sentence.map((v) => {
                let element = document.createElement('div')
                element.classList.add('__elem')
                element.innerHTML = v.mex;
                sentence.appendChild(element)
                window.setTimeout(function () {
                    element.style.transform = "scale(1)"
                }, v.wait)
            })


            let element = document.createElement('div')
            element.classList.add('__r')
            if (node.r.type === 'button') {
                node.r.el.map(v => {
                    let btn = document.createElement('a')
                    btn.classList.add('freud-btn')
                    switch (v.type) {
                        case 'nav':
                            btn.onclick = () => {
                                element.style.transform = "scale(0)"
                                self.createQuoteHuman(v.label)
                                self.do(v.value)
                            }
                            break
                        case 'action':
                            btn.onclick = () => {
                                element.style.transform = "scale(0)"
                                v.value()
                            }
                            break
                        default:
                            btn.setAttribute('href', v.value)
                            btn.setAttribute('target', "__blank")
                            break
                    }
                    btn.innerHTML = v.label;
                    element.appendChild(btn)
                })
                sentence.appendChild(element)

            }

            window.setTimeout(function () {
                element.style.transform = "scale(1)"
            }, node.r.wait)


            let box = quote.getBoundingClientRect();
            document.getElementById('bot-icon').style.top = (box.top + pageYOffset - 30) + "px"
            window.scrollTo(0,document.body.scrollHeight);

        }, node.wait)
    }

    /**
     * Create a quote from the user
     * @param v
     */
    createQuoteHuman(v) {
        let quote = document.createElement('div')
        quote.classList.add('freud-quote')
        let sentence = document.createElement('div')
        sentence.classList.add('freud-sentence')
        quote.appendChild(sentence)
        let element = document.createElement('div')
        element.classList.add('__elem')
        element.innerHTML = v;
        sentence.appendChild(element)
        this._el.appendChild(quote)

        window.setTimeout(function () {
            element.style.transform = "scale(1)"
        }, v.wait)


        let box = quote.getBoundingClientRect();
        document.getElementById('user-icon').style.opacity = '1'
        document.getElementById('user-icon').style.top = (box.top + pageYOffset - 30) + "px"
        window.scrollTo(0,document.body.scrollHeight);
    }

    /**
     * Gestore eventi
     * @param event
     * @param fn
     */
    on(event, fn) {
        this._el.addEventListener(event, e => {
            fn(e)
        }, true)
    }

    /**
     * Aggiunge un nodo di talk
     * @param node
     */
    addNode(key, node) {
        this._nodes[key] = node
    }

    /**
     * Set tutti i nodi
     * @param nodes
     */
    setNodes(nodes) {
        this._nodes = nodes
    }

    /**
     * Iteratore dei nodi
     * @param fn
     */
    eachNode(fn) {
        for (let key in this._nodes) {
            if (this._nodes.hasOwnProperty(key)) {
                fn(this._nodes[key], key, this._nodes);
            }
        }
    }

    /**
     * Elimina un nodo
     * @param index
     */
    deleteNode(key) {
        if (this._nodes.hasOwnProperty(key)) {
            delete(this._nodes[key]);
        }
    }

    moveIcon(icon){

    }

    get nodes() {
        return this._nodes;
    }

    get el() {
        return this._el;
    }
}

/**
 * Imposto la variabile $freud per essere utilizzata
 * @type {Freud}
 */
window.$freud = new Freud()
