import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class PlayListSlide extends DDDSuper(LitElement) {
  static get tag() {
    return "play-list-slide";
  }

  constructor() {
    super();
    this.liked = false;
    this.authorAvatar = "";
  }

  static get properties() {
    return {
      topHeading: { type: String, attribute: "top-heading" },
      secondHeading: { type: String, attribute: "second-heading" },
      liked: { type: Boolean },
      authorAvatar: { type: String, attribute: "author-avatar" },
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
        width: 100%;
        max-width: 420px;
        height: 640px;
        margin: 0 auto;
        background: white;
        border: 1px solid #dbdbdb;
        border-radius: 18px;
        box-sizing: border-box;
        overflow: hidden;
      }

      header {
        padding: 12px 16px 8px 16px;
        border-bottom: 1px solid #efefef;
      }

      .top {
        font-size: 12px;
        color: #737373;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .second {
        font-size: 18px;
        font-weight: 700;
        color: #111;
      }

      .media {
        flex: 0 0 360px;
        height: 360px;
        background: #f5f5f5;
        overflow: hidden;
      }

      ::slotted([slot="image"]) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .heart {
        display: block;
        background: white;
        border: 1px solid #dbdbdb;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
        padding: 8px 16px;
        margin: 8px 16px 0 16px;
        text-align: left;
        color: #111;
        border-radius: 999px;
      }

      .content {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        padding: 14px 16px 16px 16px;
        font-size: 14px;
        line-height: 1.45;
        color: #111;
      }

      .content p {
        margin: 0 0 10px 0;
      }

      .content p:last-child {
        margin-bottom: 0;
      }
      .author-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .author-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
        flex: 0 0 44px;
      }

      .author-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .author-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        flex: 0 0 40px;
      }

      .author-text {
        display: flex;
        flex-direction: column;
      }

      .author-meta p {
        margin: 0 0 4px 0;
      }

      .author-meta p:last-child {
        margin-bottom: 0;
      }
            @media (prefers-color-scheme: dark) {
      .slide {
        background: #121212;
        border: 1px solid #2a2a2a;
      }

      header {
        border-bottom: 1px solid #2a2a2a;
      }

      .top {
        color: #a1a1aa;
      }

      .second {
        color: #f5f5f5;
      }

      .media {
        background: #1c1c1c;
      }

      .heart {
        background: #1a1a1a;
        border: 1px solid #333;
        color: #f5f5f5;
      }

      .content {
        color: #f5f5f5;
      }
      
      .author-meta p {
        color: #f5f5f5;
      }
    }
    `,
  ];
}


firstUpdated() {
  const key = `liked-${this.secondHeading}`;
  this.liked = localStorage.getItem(key) === "true";
}

toggleLike() {
  this.liked = !this.liked;
  localStorage.setItem(`liked-${this.secondHeading}`, this.liked);
}



render() {
  return html`
    <section class="slide">
      <header>
        <div class="author-header">
            <img
              class="author-avatar"
              src=${this.authorAvatar}
              alt=${this.topHeading ?? "Author avatar"}
            />          
            <div class="author-text">
            <div class="top">${this.topHeading ?? ""}</div>
            <div class="second">${this.secondHeading ?? ""}</div>
          </div>
        </div>
      </header>

      <div class="media">
        <slot name="image"></slot>
      </div>

      <button class="heart" @click=${this.toggleLike}>
        ${this.liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <div class="content">
        <slot></slot>
      </div>
    </section>
  `;
}
}

globalThis.customElements.define(PlayListSlide.tag, PlayListSlide);