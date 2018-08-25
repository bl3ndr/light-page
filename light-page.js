import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `light-page`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LightPage extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
           display: inline-block;
           position: relative;
           width: 100%;
        }
      </style>
      <slot></slot>
    `;
    }

    connectedCallback() {
        super.connectedCallback();


        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.addEventListener(eventName, this._preventDefaults.bind(this), false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.addEventListener(eventName, this._highlight.bind(this), false)
        });
        ['dragleave', 'drop'].forEach(eventName => {
            this.addEventListener(eventName, this._unhighlight.bind(this), false)
        });
        this.addEventListener('drop', this._handleDrop.bind(this), false);
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    static get properties() {
        return {
            droppedFiles: {
                type: Array
            },

            detectDrag: {
                type: Boolean,
                value: true
            },

            _dragover: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
    }

    _preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    _highlight(e) {
        this._dragover = true;
    }

    _unhighlight(e) {
        this._dragover = false;
    }

    _handleDrop(e) {

        let dt = e.dataTransfer;
        this.droppedFiles = dt.files;
        console.log(this.droppedFiles)
    }
}

window.customElements.define('light-page', LightPage);
