let count = 0;
let _id = () => `ja-input-${count++}`;

const template = (
  id,
  name,
  type = "text",
  color = "whitesmoke",
  background = "#333",
  textArea = false,
  classes = ""
) => {
  const template = document.createElement("template");

  template.innerHTML = `
<style>
  .ja-inline-label {
    position: relative;
    margin: auto;
  }

  label {
    position: absolute;
    left: 10%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    color: ${color || "whitesmoke"};
    background-color: ${background || "#333"};
  }

  label span {
    margin: auto 0.2rem;
  }

  input {
    background-color: ${background || "#333"};
    border: 0.05rem solid ${color || "whitesmoke"};
    border-radius: 0.1rem;
    font-size: 1rem;
    color: ${color || "whitesmoke"};
    padding: 0.55rem 0.5rem;
    outline: none;
  }

  input:focus {
    outline: none;
  }
</style>
<div class="ja-inline-label ${classes || ""}" _ilil=${id}>
  <label for="${name}">
    <span>${name}</span>
  </label>
  <${textArea ? "textarea" : "input"} type="${type || "text"}" name="${name}" />
</div>
`;

  return template;
};

class InlineInputLabel extends HTMLElement {
  constructor() {
    super();
    this._id = _id();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      template(
        this._id,
        this.getAttribute("name"),
        this.getAttribute("type"),
        this.getAttribute("color"),
        this.getAttribute("textarea") !== undefined,
        this.getAttribute("class")
      ).content.cloneNode(true)
    );

    console.log(this.getAttribute("textarea"));
  }
}

window.customElements.define("inline-input", InlineInputLabel);
