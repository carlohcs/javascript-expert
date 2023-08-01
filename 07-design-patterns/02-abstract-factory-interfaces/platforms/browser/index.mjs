import { ViewFactory } from "../../shared/base/view-factory.mjs"
import { TableBrowserComponent } from "./table.mjs"

export class BrowserFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent()
  }
}
