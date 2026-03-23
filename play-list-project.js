/**
 * Copyright 2026 David Isidro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./slide-indicator.js"
import "./slide-arrows.js"
import "./play-list-slide.js";



/**
 * `play-list-project`
 * 
 * @demo index.html
 * @element play-list-project
 */
export class PlayListProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-project";
  }

  constructor() {
    super();
    this.index = 0;
    this._slides = [];
    this._total = 0;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.foxImage = "";
    this.foxLink = "";
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: { type: Number, reflect: true },
      _slides: { state: true },
      _total: { state: true },
      foxImage: { type: String },
      foxLink: { type: String },
    };
  }
_handleSlotChange(e) {
  const slot = e.target;
  const assigned = slot.assignedElements({ flatten: true });

  this._slides = assigned.filter((el) => el.tagName?.toLowerCase() === "play-list-slide");
  this._total = this._slides.length;

  if (this._total > 0 && this.index > this._total - 1) {
    this.index = this._total - 1;
  }
}
_nextSlide() {
  if (this._total === 0) return;
  this.index = (this.index + 1) % this._total;
}

_prevSlide() {
  if (this._total === 0) return;
  this.index = (this.index - 1 + this._total) % this._total;


}
updated(changedProperties) {
  if (!changedProperties.has("index")) return;

  const slot = this.shadowRoot?.querySelector("#slides");
  if (!slot) return;

  const slides = slot.assignedElements({ flatten: true });
  const active = slides[this.index];

  active?.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });
}
  async loadFox() {
    try {
      const response = await fetch("https://randomfox.ca/floof/");
      const data = await response.json();
      this.foxImage = data.image || "";
      this.foxLink = data.link || "";
    } catch (error) {
      console.error("Fox API failed:", error);
    }
  }
    firstUpdated() {
    this.loadFox();
  }
  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        flex: 0 0 100%;
        box-sizing: border-box;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        overflow: visible;
      }
      h3 span {
        font-size: var(--play-list-project-label-font-size, var(--ddd-font-size-s));
      }
        .viewport {
      overflow-x: auto;
      display: flex;
      scroll-snap-type: x mandatory;
    }
      .viewport {
      scrollbar-width: none;
    }

    .viewport::-webkit-scrollbar {
      display: none;
    }

    ::slotted(play-list-slide) {
      flex: 0 0 100%;
      scroll-snap-align: start; 
    }
    `];
  }


  // Lit render the HTML
render() {
  return html`
    <div class="wrapper">
      <h3><span>${this.t.title}:</span> ${this.title}</h3>

      <slide-arrows
        @next=${() => this._nextSlide()}
        @prev=${() => this._prevSlide()}
      ></slide-arrows>

      <p>Slides: ${this._total} | Current index: ${this.index}</p>

      <div class="viewport">
        <slot id="slides" @slotchange=${this._handleSlotChange}></slot>
      </div>

      <slide-indicator
        .total=${this._total}
        .active=${this.index}
        @go-to=${(e) => (this.index = e.detail)}
      ></slide-indicator>
    </div>
  `;
  }
  /**
   * haxProperties integration via file reference
   */
}

globalThis.customElements.define(PlayListProject.tag, PlayListProject);