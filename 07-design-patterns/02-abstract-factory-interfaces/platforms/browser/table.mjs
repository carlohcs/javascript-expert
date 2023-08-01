import { TableComponent } from "../../shared/base/table-component.mjs"

export class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    const defaultElement = document.createElement('div')
    defaultElement.innerHTML = template
    document.body.insertAdjacentElement('afterbegin', defaultElement);
  }

  prepareData(data) {
    const [firstItem] = data
    const tHeaders = Object.keys(firstItem).map(
      (text) => `<th scope=col>${text}</th>`
    )

    const joinLists = (list) => list.join("")

    const tBodyValues = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinLists(tds)}</tr>`)

    const template = `
      <table class="table">
        <thead>
          <tr>
            ${joinLists(tHeaders)}
          </tr>
        </thead>
        <tbody>
          ${joinLists(tBodyValues)}
        </tbody>
      </table>`

    return template
  }
}
