import { registerWidget } from "../render";
import Columns from "./columns";
import Page from "./page";
import Tpl from "./tpl";
import Input from "./input";

registerWidget({ type: "page" }, Page);
registerWidget({ type: "columns" }, Columns);
registerWidget({ type: "tpl" }, Tpl);
registerWidget({ type: "input" }, Input);
