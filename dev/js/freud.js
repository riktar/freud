class Freud {
    /**
     * Costruttore
     * @param elem
     */
    constructor() {
        // Params
        this._el = null
        this._vars = {}
        this._nodes = {}
        this._regex = /[{]{2}(\S*)[}]{2}/g;
    }

    init(elSelector, nodes = {}){
        this._el = document.querySelector(elSelector);
        this.setNodes(nodes)
        this.start()
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
            //creo i div di conversazione
            let quote = document.createElement('div')
            quote.classList.add('freud-quote', '__bot')
            let sentence = document.createElement('div')
            sentence.classList.add('freud-sentence')
            //ecco il blocco di frasi
            quote.appendChild(sentence)
            //appendo tutto al div contenitore
            self._el.appendChild(quote)

            node.sentence.map((v) => {
                let mexParse = v.mex
                let element = document.createElement('div')
                element.classList.add('__elem')
                // sostituisco i placeholder {{}} con il valore della variabile richiesto
                let m, findgr
                while ((m = self._regex.exec(v.mex)) !== null) {
                    // per evitare loop infiniti se non trova match
                    if (m.index === self._regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    // eseguo i risultati, quando il gruppo e 0 trova {{nome}} mentre a gruppo 1 trova "nome"
                    m.forEach((match, groupIndex) => {
                        if (groupIndex === 0) {
                            // trovo il placeholder completo
                            findgr = match;
                        } else {
                            //sostituisco il placeholder con la variabile
                            mexParse = mexParse.replace(findgr, self.getVar(match))
                        }
                    });
                }
                // faccio l'append del messaggio
                element.innerHTML = mexParse;
                sentence.appendChild(element)
                window.setTimeout(function () {
                    element.style.transform = "scale(1)"
                }, v.wait)
            })

            let element = document.createElement('div')
            element.classList.add('__r')
            if (node.r !== undefined) {
                switch (node.r.type) {
                    case 'button':
                        node.r.el.map(v => {
                            let btn = document.createElement('a')
                            btn.classList.add('freud-btn')
                            switch (v.type) {
                                case 'nav':
                                    btn.onclick = () => {
                                        element.style.transform = "scale(0)"
                                        element.style.display = 'none'
                                        self.createQuoteHuman(v.label)
                                        self.do(v.value)
                                    }
                                    break
                                case 'action':
                                    btn.onclick = () => {
                                        element.style.transform = "scale(0)"
                                        element.style.display = 'none'
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
                        break;
                    case 'input':
                        node.r.el.map(v => {
                            let input = document.createElement('input')
                            input.classList.add('freud-input')
                            input.setAttribute('placeholder', v.label);
                            input.setAttribute('type', 'text');
                            input.setAttribute('value', '');
                            input.onkeypress = function (e) {
                                if (!e) e = window.event;
                                var keyCode = e.keyCode || e.which;
                                if (keyCode == '13') {
                                    v.fn(this.value);
                                    element.style.transform = "scale(0)"
                                    element.style.display = 'none'
                                    self.createQuoteHuman(this.value)
                                    return false;
                                }
                            }
                            element.appendChild(input)
                        })
                        sentence.appendChild(element)
                        break;
                    default:
                        break;
                }
            }

            window.setTimeout(function () {
                element.style.transform = "scale(1)"
            }, node.r.wait)


            let box = quote.getBoundingClientRect();
            let freudtop = self._el.getBoundingClientRect()
            document.getElementById('bot-icon').style.top = (box.top - freudtop.top) + "px"
            window.scrollTo(0, document.body.scrollHeight);
            //self._el.scrollTo(0, self._el.scrollHeight);

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
        let freudtop = this._el.getBoundingClientRect()
        document.getElementById('user-icon').style.opacity = '1'
        document.getElementById('user-icon').style.top = (box.top - freudtop.top) + "px"
        window.scrollTo(0, document.body.scrollHeight);
        //this._el.scrollTo(0, this._el.scrollHeight);
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

    setVar(key, variabile) {
        this._vars[key] = variabile;
    }

    getVar(key) {
        return this._vars[key]
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
