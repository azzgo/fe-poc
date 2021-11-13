import { registerComp } from "../render";
import Columns from "./columns";
import Page from "./page";
import Tpl from "./tpl";
import Input from "./input";

registerComp({ type: "page" }, Page);
registerComp({ type: "columns" }, Columns);
registerComp({ type: "tpl" }, Tpl);
registerComp({ type: "input" }, Input);
