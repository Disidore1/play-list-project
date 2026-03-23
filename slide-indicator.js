import { LitElement, html, css } from "lit";

export class SlideIndicator extends LitElement {
  static properties = {
    total: { type: Number },
    active: { type: Number },
  };

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 16px;
      min-height: 20px;
      width: 100%;
    }

    button {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #0b8f5a;
      background: white;
      cursor: pointer;
      padding: 0;
    }

    button[active] {
      background: #0b8f5a;
      transform: scale(1.15);
    }
  `;

  _goTo(index) {
    this.dispatchEvent(
      new CustomEvent("go-to", {
        detail: index,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      ${Array.from({ length: this.total || 0 }).map(
        (_, i) => html`
          <button
            ?active=${i === this.active}
            aria-label="Go to slide ${i + 1}"
            @click=${() => this._goTo(i)}
          ></button>
        `
      )}
    `;
  }
}

customElements.define("slide-indicator", SlideIndicator);