(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Freud = function () {
    /**
     * Costruttore
     * @param elem
     */
    function Freud() {
        _classCallCheck(this, Freud);

        // Params
        this._el = null;
        this._vars = {};
        this._nodes = {};
        this._regex = /[{]{2}(\S*)[}]{2}/g;
    }

    _createClass(Freud, [{
        key: 'init',
        value: function init(elSelector) {
            var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this._el = document.querySelector(elSelector);
            this.setNodes(nodes);
            this.start();
        }

        /**
         * Start from the first quote
         */

    }, {
        key: 'start',
        value: function start() {
            this.do("start");
        }

        /**
         * Do a quote
         * @param key
         */

    }, {
        key: 'do',
        value: function _do(key) {
            if (this._nodes.hasOwnProperty(key)) {
                var node = this._nodes[key];
                this.createQuoteBot(node);
            } else {
                // error :(
            }
        }

        /**
         * Create a quote from the bot
         * @param node
         */

    }, {
        key: 'createQuoteBot',
        value: function createQuoteBot(node) {
            var self = this;
            window.setTimeout(function () {
                //creo i div di conversazione
                var quote = document.createElement('div');
                quote.classList.add('freud-quote', '__bot');
                var sentence = document.createElement('div');
                sentence.classList.add('freud-sentence');
                //ecco il blocco di frasi
                quote.appendChild(sentence);
                //appendo tutto al div contenitore
                self._el.appendChild(quote);

                node.sentence.map(function (v) {
                    var element = document.createElement('div');
                    element.classList.add('__elem');
                    // sostituisco i placeholder {{}} con il valore della variabile richiesto
                    var m = void 0,
                        findgr = void 0;
                    while ((m = self._regex.exec(v.mex)) !== null) {
                        // per evitare loop infiniti se non trova match
                        if (m.index === self._regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        // eseguo i risultati, quando il gruppo e 0 trova {{nome}} mentre a gruppo 1 trova "nome"
                        m.forEach(function (match, groupIndex) {
                            if (groupIndex === 0) {
                                // trovo il placeholder completo
                                findgr = match;
                            } else {
                                //sostituisco il placeholder con la variabile
                                v.mex = v.mex.replace(findgr, self.getVar(match));
                            }
                        });
                    }
                    // faccio l'append del messaggio
                    element.innerHTML = v.mex;
                    sentence.appendChild(element);
                    window.setTimeout(function () {
                        element.style.transform = "scale(1)";
                    }, v.wait);
                });

                var element = document.createElement('div');
                element.classList.add('__r');
                if (node.r !== undefined) {
                    switch (node.r.type) {
                        case 'button':
                            node.r.el.map(function (v) {
                                var btn = document.createElement('a');
                                btn.classList.add('freud-btn');
                                switch (v.type) {
                                    case 'nav':
                                        btn.onclick = function () {
                                            element.style.transform = "scale(0)";
                                            element.style.display = 'none';
                                            self.createQuoteHuman(v.label);
                                            self.do(v.value);
                                        };
                                        break;
                                    case 'action':
                                        btn.onclick = function () {
                                            element.style.transform = "scale(0)";
                                            element.style.display = 'none';
                                            v.value();
                                        };
                                        break;
                                    default:
                                        btn.setAttribute('href', v.value);
                                        btn.setAttribute('target', "__blank");
                                        break;
                                }
                                btn.innerHTML = v.label;
                                element.appendChild(btn);
                            });
                            sentence.appendChild(element);
                            break;
                        case 'input':
                            node.r.el.map(function (v) {
                                var input = document.createElement('input');
                                input.classList.add('freud-input');
                                input.setAttribute('placeholder', v.label);
                                input.setAttribute('type', 'text');
                                input.setAttribute('value', '');
                                input.onkeypress = function (e) {
                                    if (!e) e = window.event;
                                    var keyCode = e.keyCode || e.which;
                                    if (keyCode == '13') {
                                        v.fn(this.value);
                                        element.style.transform = "scale(0)";
                                        element.style.display = 'none';
                                        self.createQuoteHuman(this.value);
                                        return false;
                                    }
                                };
                                element.appendChild(input);
                            });
                            sentence.appendChild(element);
                            break;
                        default:
                            break;
                    }
                }

                window.setTimeout(function () {
                    element.style.transform = "scale(1)";
                }, node.r.wait);

                var box = quote.getBoundingClientRect();
                document.getElementById('bot-icon').style.top = box.top + pageYOffset - 22 + "px";
                window.scrollTo(0, document.body.scrollHeight);
                //self._el.scrollTo(0, self._el.scrollHeight);
            }, node.wait);
        }

        /**
         * Create a quote from the user
         * @param v
         */

    }, {
        key: 'createQuoteHuman',
        value: function createQuoteHuman(v) {
            var quote = document.createElement('div');
            quote.classList.add('freud-quote');
            var sentence = document.createElement('div');
            sentence.classList.add('freud-sentence');
            quote.appendChild(sentence);
            var element = document.createElement('div');
            element.classList.add('__elem');
            element.innerHTML = v;
            sentence.appendChild(element);
            this._el.appendChild(quote);

            window.setTimeout(function () {
                element.style.transform = "scale(1)";
            }, v.wait);

            var box = quote.getBoundingClientRect();
            document.getElementById('user-icon').style.opacity = '1';
            document.getElementById('user-icon').style.top = box.top + pageYOffset - 22 + "px";
            window.scrollTo(0, document.body.scrollHeight);
            //this._el.scrollTo(0, this._el.scrollHeight);
        }

        /**
         * Gestore eventi
         * @param event
         * @param fn
         */

    }, {
        key: 'on',
        value: function on(event, fn) {
            this._el.addEventListener(event, function (e) {
                fn(e);
            }, true);
        }

        /**
         * Aggiunge un nodo di talk
         * @param node
         */

    }, {
        key: 'addNode',
        value: function addNode(key, node) {
            this._nodes[key] = node;
        }

        /**
         * Set tutti i nodi
         * @param nodes
         */

    }, {
        key: 'setNodes',
        value: function setNodes(nodes) {
            this._nodes = nodes;
        }

        /**
         * Iteratore dei nodi
         * @param fn
         */

    }, {
        key: 'eachNode',
        value: function eachNode(fn) {
            for (var key in this._nodes) {
                if (this._nodes.hasOwnProperty(key)) {
                    fn(this._nodes[key], key, this._nodes);
                }
            }
        }

        /**
         * Elimina un nodo
         * @param index
         */

    }, {
        key: 'deleteNode',
        value: function deleteNode(key) {
            if (this._nodes.hasOwnProperty(key)) {
                delete this._nodes[key];
            }
        }
    }, {
        key: 'moveIcon',
        value: function moveIcon(icon) {}
    }, {
        key: 'setVar',
        value: function setVar(key, variabile) {
            this._vars[key] = variabile;
        }
    }, {
        key: 'getVar',
        value: function getVar(key) {
            return this._vars[key];
        }
    }, {
        key: 'nodes',
        get: function get() {
            return this._nodes;
        }
    }, {
        key: 'el',
        get: function get() {
            return this._el;
        }
    }]);

    return Freud;
}();

/**
 * Imposto la variabile $freud per essere utilizzata
 * @type {Freud}
 */


window.$freud = new Freud();

},{}]},{},[1]);
