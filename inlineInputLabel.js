/**
 * https://github.com/JonoAugustine/inline-input
 * @author JonoAugustine
 */

const containerName = "ja-inline-label";

const style = (color, background) => `
<style>
  .${containerName} {
    position: relative;
    margin: auto;
  }

  .${containerName} label {
    position: absolute;
    left: 10%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    color: ${color || "whitesmoke"};
    background-color: ${background || "#333"};
  }

  .${containerName} label span {
    margin: auto 0.2rem;
  }

  .${containerName} input,
   .${containerName} textarea {
    background-color: ${background || "#333"};
    border: 0.05rem solid ${color || "whitesmoke"};
    border-radius: 0.1rem;
    font-size: 1rem;
    color: ${color || "whitesmoke"};
    padding: 0.55rem 0.5rem;
    outline: none;
  }

  .${containerName} input:focus {
    outline: none;
  }
</style>`;

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
${style(color, background)}

<div id="${id}" class="${containerName} ${classes || ""}" >
  <label for="${name}">
    <span>${name}</span>
  </label>
  <${textArea ? "textarea" : "input"} type="${type || "text"}" name="${name}"
  ${textArea ? "></textarea>" : "/>"}
</div>`;

  return template;
};

class InlineInputLabel extends HTMLElement {
  static count = 0;

  constructor() {
    super();

    this._id = `ja-input-${InlineInputLabel.count++}`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(
      template(
        this.getAttribute("id") || this._id,
        this.getAttribute("name"),
        this.getAttribute("type"),
        this.getAttribute("color"),
        this.getAttribute("background-color"),
        this.getAttribute("textarea") === "",
        this.getAttribute("class")
      ).content.cloneNode(true)
    );
  }
}

window.customElements.define("inline-input", InlineInputLabel);
