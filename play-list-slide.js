import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListSlide extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-slide";
  }

  static get properties() {
    return {
      topHeading: { type: String, attribute: "top-heading" },
      secondHeading: { type: String, attribute: "second-heading" },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          flex: 0 0 100%;
          box-sizing: border-box;
        }

        .slide {
          display: flex;
          flex-direction: column;
          min-height: 320px;
          max-height: 320px;
          padding: var(--ddd-spacing-4);
          background-color: var(--ddd-theme-default-white);
          border-radius: var(--ddd-radius-lg);
          box-sizing: border-box;
        }

        .top {
          font-size: var(--ddd-font-size-s);
          margin-bottom: var(--ddd-spacing-2);
        }

        .second {
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          margin-bottom: var(--ddd-spacing-2);
        }

        .content {
          flex: 1;
          overflow-y: auto;
          padding-right: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-m);
          line-height: 1.5;
        }

        img {
          max-width: 100%;
          border-radius: 12px;
          margin-bottom: 12px;
        }
      `,
    ];
  }

  render() {
    return html`
      <section class="slide">
        <header>
          <div class="top">${this.topHeading ?? ""}</div>
          <div class="second">${this.secondHeading ?? ""}</div>
        </header>

        <div class="content">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);