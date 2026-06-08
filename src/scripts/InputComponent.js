class InputComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['label', 'type', 'id', 'name', 'placeholder', 'icon', 'required'];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const label = this.getAttribute('label') || '';
    const type = this.getAttribute('type') || 'text';
    const id = this.getAttribute('id') || '';
    const name = this.getAttribute('name') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const icon = this.getAttribute('icon') || '';
    const required = this.hasAttribute('required') ? 'required' : '';

    this.shadowRoot.innerHTML = `
      <style>
        .form-label {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.3rem;
          display: block;
        }
        .input-wrapper {
          position: relative;
          width: 100%;
        }
        .form-input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.9rem 2.5rem 0.9rem 1rem;
          border: none;
          border-radius: 6px;
          background: var(--color-white, #fff);
          color: var(--color-black, #000);
          font-size: 1rem;
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          box-shadow: 0 1px 4px rgba(25,25,25,0.04);
          outline: none;
          transition: box-shadow 0.2s;
        }
        .form-input:focus {
          box-shadow: 0 2px 8px rgba(219,11,0,0.10);
        }
        .input-icon {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-secondary, #5E6366);
          font-size: 1.3rem;
          pointer-events: none;
          font-family: 'Material Icons';
        }
      </style>
      <label class="form-label" for="${id}">${label}</label>
      <div class="input-wrapper">
        <input class="form-input" type="${type}" id="${id}" name="${name}" placeholder="${placeholder}" ${required} />
        <span class="material-icons input-icon">${icon}</span>
      </div>
    `;
  }
}

customElements.define('input-component', InputComponent); 
