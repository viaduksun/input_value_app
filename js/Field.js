class Field extends Component {
  constructor() {
    super();
    this.checkedArr = [];
  }
  setChecked(id) {
    if (this.checkedArr.includes(id)) {
      this.checkedArr = this.checkedArr.filter(item => item !== id);
    } else {
      this.checkedArr.push(id);
    }
  }
  deleteSelected(db) {
    const filteredDB = db.filter((item) => !this.checkedArr.includes(item.id));
    this.fieldBody.innerHTML = '';
    this.renderItems(filteredDB);
    localStorage.setItem('db', JSON.stringify(filteredDB));
    this.checkedArr = [];
    return filteredDB;
  }
  deleteAll() {
    localStorage.removeItem('db');
    this.fieldBody.innerHTML = '';
  }
  renderItem(item, index) {
    this.item = this.createElement("div", ["item"]);
    this.elem01 = this.createElement("span", ["sm"], index + 1);
    this.elem02 = this.createElement("span", ["st"], item.name);
    this.elem03 = this.createElement("span", ["st"], item.value);
    this.elem04 = this.createElement("span", ["sm"]);

    this.checkbox = this.createElement("input", ["item-check"]);
    this.checkbox.setAttribute("type", "checkbox")

    this.checkbox.addEventListener("click", () => (this.setChecked(item.id)))
    if (item.checked) {
      this.checkbox.setAttribute("checked");
    }
    this.elem04.append(this.checkbox);
    this.item.append(this.elem01, this.elem02, this.elem03, this.elem04)
    return this.item;
  }
  renderItems(db) {
    this.fieldBody.innerHTML = '';
    if (db.length > 0) {
      db.forEach((item, index) => (
        this.fieldBody.append(this.renderItem(item, index))
      ))
      this.fieldHeder.after(this.fieldBody);
    } else { return }
  }
  render() {
    this.fieldWrapper = this.createElement("div", ["field-wrapper"]);
    this.fieldHeder = this.createElement("div", ["field-heder"]);
    this.fieldBody = this.createElement("div", ["field-body"]);

    this.header01 = this.createElement("span", ["field-heder-section", "small"], "No");
    this.header02 = this.createElement("span", ["field-heder-section"], "Name");
    this.header03 = this.createElement("span", ["field-heder-section"], "Value");
    this.header04 = this.createElement("span", ["field-heder-section", "small"], "Select");

    this.fieldHeder.append(this.header01, this.header02, this.header03, this.header04);
    this.fieldWrapper.append(this.fieldHeder, this.fieldBody);

    return this.fieldWrapper;
  }
}
const field = new Field();
