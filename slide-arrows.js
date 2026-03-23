import { LitElement, html, css } from "lit";

export class SlideArrows extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: var(--ddd-spacing-2) 0;
    }
    button {
      font-size: var(--ddd-font-size-m);
      padding: var(--ddd-spacing-2);
      cursor: pointer;
    }
  `;

  _prev() {
    this.dispatchEvent(
      new CustomEvent("prev", {
        bubbles: true,
        composed: true,
      })
    );
  }

  _next() {
    this.dispatchEvent(
      new CustomEvent("next", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button @click=${this._prev} aria-label="Previous slide">
        ◀
      </button>

      <button @click=${this._next} aria-label="Next slide">
        ▶
      </button>
    `;
  }
}

customElements.define("slide-arrows", SlideArrows);