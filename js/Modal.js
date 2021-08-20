class Modal extends Component {
  constructor() {
    super();
  }
  show(title, elementHTML) {
    this.modalBody.innerHTML = null;
    this.addClass(this.modalWrapper, "active");

    this.modalHeader.textContent = title;
    this.modalBody.append(elementHTML);
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      this.addClass(this.modalCover, "cover-active");
      this.modal.classList.add("modal-active");
    }, 100);
    this.modalCover.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log('Close');
      if (e.target.classList.contains("cover-active")) {
        this.hide()
      }
    })
  }
  hide() {
    this.removeClass(this.modalWrapper, "active");
    this.removeClass(this.modalCover, "cover-active");
    document.body.classList.remove("no-scroll");
  }
  render() {
    this.modalWrapper = this.createElement("div", ["modal-wrapper"]);
    this.modalCover = this.createElement("div", ["modal-cover"]);
    this.modal = this.createElement("div", ["modal"]);

    this.modalHeader = this.createElement("div", ["modal-header"]);
    this.modalHeaderClose = this.createElement("div", ["close"]);

    this.modalBody = this.createElement("div", ["modal-body"]);
    this.modalFooter = this.createElement("div", ["modal-footer"]);
    this.modalFooterBtn = this.createElement("button", ["btn", "btn-modal"], 'Close');

    this.modalFooterBtn.addEventListener("click", (e) => {
      this.hide();
    })
    this.modalHeader.append(this.modalHeaderClose);
    this.modalFooter.append(this.modalFooterBtn);
    this.modal.append(
      this.modalHeader, this.modalBody, this.modalFooter
    );
    this.modalCover.append(this.modal);
    this.modalWrapper.append(this.modalCover);
    document.body.append(this.modalWrapper);
    return this.modalWrapper;
  }
}

const modal = new Modal();
modal.render();