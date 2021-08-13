import { observable } from "mobx";

export const counter = observable({
  count: 0,
  triggerWay: "click",
});

export function IncreaseCount() {
  counter.count++;
}

export function DecreaseCount() {
  counter.count > 0 ? counter.count-- : 0;
}
