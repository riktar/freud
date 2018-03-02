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
        this._el = document.getElementById('freud');
        this._nodes = {};

        // Events
    }

    _createClass(Freud, [{
        key: 'start',
        value: function start() {
            this.do("start");
        }
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
    }, {
        key: 'createQuoteBot',
        value: function createQuoteBot(node) {
            var self = this;
            window.setTimeout(function () {
                var quote = document.createElement('div');
                quote.classList.add('freud-quote');
                var sentence = document.createElement('div');
                sentence.classList.add('freud-sentence');

                quote.appendChild(sentence);

                self._el.appendChild(quote);

                node.sentence.map(function (v) {
                    var element = document.createElement('div');
                    element.classList.add('__elem');
                    element.innerHTML = v.mex;
                    sentence.appendChild(element);
                    window.setTimeout(function () {
                        element.style.transform = "scale(1)";
                    }, v.wait);
                });

                var element = document.createElement('div');
                element.classList.add('__r');
                if (node.r.type === 'button') {
                    node.r.el.map(function (v) {
                        var btn = document.createElement('a');
                        btn.classList.add('freud-btn');
                        switch (v.type) {
                            case 'nav':
                                btn.onclick = function () {
                                    self.createQuoteHuman(v.label);
                                    self.do(v.value);
                                };
                                break;
                            case 'action':
                                btn.onclick = function () {
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
                }

                window.setTimeout(function () {
                    element.style.transform = "scale(1)";
                }, node.r.wait);

                var box = quote.getBoundingClientRect();
                document.getElementById('bot-icon').style.top = box.top + pageYOffset - 30 + "px";
            }, node.wait);
        }
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
            document.getElementById('user-icon').style.top = box.top + pageYOffset - 30 + "px";
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
