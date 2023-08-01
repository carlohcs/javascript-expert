import { ViewFactory } from "../../shared/base/view-factory.mjs"
import { TableConsoleComponent } from "./table.mjs"

export class ConsoleFactory extends ViewFactory {
  createTable() {
    return new TableConsoleComponent()
  }
}
