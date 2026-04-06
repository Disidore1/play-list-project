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
    this.foxImage = "";
    this.foxLink = "";
    this.apiData = null;
  }

  static get properties() {
    return {
      ...super.properties,
      index: {type: Number, reflect: true },
      _slides: {state: true},
      _total: {state: true},
      foxImage: {type: String},
      foxLink: {type: String},
      apiData: {type: Object},
    };
  }

_nextSlide() {
  if (this._total === 0) return;
  this.index = (this.index + 1) % this._total;
  localStorage.setItem("play-list-project-index", this.index);
  this._updateUrl();
}

_prevSlide() {
  if (this._total === 0) return;
  this.index = (this.index - 1 + this._total) % this._total;
  localStorage.setItem("play-list-project-index", this.index);
  this._updateUrl();
}

updated(changedProperties) {
  if (!changedProperties.has("index")) return;

  const slides = this.shadowRoot?.querySelectorAll("play-list-slide");
  const active = slides?.[this.index];

  active?.scrollIntoView({
    behavior: "smooth",
    inline: "start",
    block: "nearest",
  });
}

async loadFox() {
  try {
    const response = await fetch("/api/fox");
    const data = await response.json();

    console.log("API DATA:", data);

    this.apiData = data;
    this._total = data.images.length;
  } catch (error) {
    console.error("API failed:", error);
  }
}

_applyFoxToFirstSlide() {
  const firstSlide = this.querySelector("play-list-slide");
  if (!firstSlide) return;

  const imageEl = firstSlide.querySelector('img[slot="image"]');
  if (imageEl && this.foxImage) {
    imageEl.src = this.foxImage;
    imageEl.alt = "Random fox from API";
  }
}
firstUpdated() {
  const url = new URL(window.location.href);

  const activeIndexParam = url.searchParams.get("activeIndex");

  if (activeIndexParam !== null) {
    this.index = Number(activeIndexParam);
  } else {
    const savedIndex = localStorage.getItem("play-list-project-index");
    if (savedIndex !== null) {
      this.index = Number(savedIndex);
    }
  }

  url.searchParams.delete("slide");
  window.history.replaceState({}, "", url);

  setTimeout(() => {
    this.loadFox();
  }, 100);


  setTimeout(() => {
    this.loadFox();
  }, 100);
}

_updateUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("activeIndex", this.index);
  window.history.replaceState({}, "", url);
}

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: #fafafa;
        font-family: var(--ddd-font-navigation);
        }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        overflow: visible;
        max-width: 520px;
        margin-left: auto;
        margin-right: auto;
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
      .slider-row {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
      }

      .viewport {
        flex: 1;
        overflow-x: auto;
        display: flex;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }

      .viewport::-webkit-scrollbar {
        display: none;
      }
      .slider-shell {
        position: relative;
      }

    @media (max-width: 600px) {
      .wrapper {
        padding: 12px;
        max-width: 100%;
      }

      .slider-shell {
        width: 100%;
      }

      slide-arrows {
        transform: scale(0.9);
      }

      slide-indicator {
        margin-top: 10px;
      }

    @media (max-width: 600px) {
      .wrapper {
        padding: 12px;
        margin: 0;
      }

      .slider-shell {
        width: 100%;
      }

      .viewport {
        padding: 0;
      }

      slide-arrows {
        transform: scale(0.9);
      }

      slide-indicator {
        margin-top: 10px;
      }
}
    `];
  }


render() {
  return html`
    <div class="wrapper">
      <div class="slider-shell">
        <slide-arrows
          @next=${() => this._nextSlide()}
          @prev=${() => this._prevSlide()}
        ></slide-arrows>

       <div class="viewport">
          ${(this.apiData?.images || []).map(
            (image) => html`
              <play-list-slide
                top-heading=${this.apiData.author.name}
                second-heading=${image.name}
                author-avatar=${this.apiData.author.avatar}
              >
                <img
                  slot="image"
                  src=${image.fullSrc}
                  alt=${image.name}
                  loading="lazy"
                />
                <p>${image.caption}</p>
                <p>Date taken: ${image.dateTaken}</p>
                <p>Channel: ${this.apiData.author.channelName}</p>
              </play-list-slide>
            `
          )}
        </div>
      </div>

      <slide-indicator
        .total=${this._total}
        .active=${this.index}
       @go-to=${(e) => {
          this.index = e.detail;
          localStorage.setItem("play-list-project-index", this.index);
          this._updateUrl();
        }}
      ></slide-indicator>
    </div>
  `;
}
  /**
   * haxProperties integration via file reference
   */
}

globalThis.customElements.define(PlayListProject.tag, PlayListProject);