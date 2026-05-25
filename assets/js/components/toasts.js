class ToastService {
  constructor() {
    this.container = null;
    this._ensureContainer();
  }

  _ensureContainer() {
    this.container = document.querySelector(".toast-container");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    }
  }

  show(title, message, type = "info", duration = 4000) {
    this._ensureContainer();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    if (type === "danger") {
      toast.setAttribute("role", "alert");
      toast.setAttribute("aria-live", "assertive");
    } else {
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
    }

    const icons = {
      success: `<svg class="toast-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>`,
      info: `<svg class="toast-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>`,
      warning: `<svg class="toast-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>`,
      danger: `<svg class="toast-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>`,
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <div class="toast-content">
        <h6 class="toast-title">${title}</h6>
        <p class="toast-body">${message}</p>
      </div>
      <button class="btn-close" aria-label="Cerrar notificación"></button>
    `;

    this.container.appendChild(toast);

    const dismiss = () => {
      if (toast.classList.contains("fade-out")) return;
      toast.classList.add("fade-out");

      const cleanup = () => {
        toast.remove();
      };

      toast.addEventListener("transitionend", cleanup, { once: true });
      setTimeout(cleanup, 400);
    };

    const closeBtn = toast.querySelector(".btn-close");
    closeBtn.addEventListener("click", dismiss);

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  }

  init(_container = document) {
  }
}

const Toasts = new ToastService();
export default Toasts;
export { ToastService, Toasts };
