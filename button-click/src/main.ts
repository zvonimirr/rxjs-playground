import { Observable, Subscription, fromEvent } from "rxjs";
import "./style.css";

let buttonClicks: number = 0;

const button: HTMLButtonElement = document.getElementById(
  "mainButton"
) as HTMLButtonElement;
const buttonClicksElement: HTMLSpanElement = document.getElementById(
  "buttonClicks"
) as HTMLSpanElement;
const lastClickElement: HTMLSpanElement = document.getElementById(
  "lastClick"
) as HTMLSpanElement;

const startObserverButton: HTMLButtonElement = document.getElementById(
  "startButton"
) as HTMLButtonElement;
const stopObserverButton: HTMLButtonElement = document.getElementById(
  "stopButton"
) as HTMLButtonElement;

const mainButtonObservable: Observable<Event> = fromEvent(button, "click");

const observerCallback = (): void => {
  buttonClicks++;
  buttonClicksElement.innerText = buttonClicks.toString();
  lastClickElement.innerText = new Date().toString();
};

let subscription: Subscription | null =
  mainButtonObservable.subscribe(observerCallback);

const startObserverObservable: Observable<Event> = fromEvent(
  startObserverButton,
  "click"
);
const stopObserverObservable: Observable<Event> = fromEvent(
  stopObserverButton,
  "click"
);

startObserverObservable.subscribe(() => {
  if (subscription === null) {
    subscription = mainButtonObservable.subscribe(observerCallback);
  }
});

stopObserverObservable.subscribe(() => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
});
