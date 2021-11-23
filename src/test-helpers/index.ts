import { fireEvent } from "@testing-library/react";

const createClientXYObject = (x?: number, y?: number) => ({
  clientX: x,
  clientY: y,
});

const createTouchEvent = ({ x, y }: { x?: number; y?: number }) => ({
  touches: [createClientXYObject(x, y)],
});

export const swipeLeft = (element: Document | Node | Element) => {
  fireEvent.touchStart(element, createTouchEvent({ x: 100, y: 100 }));
  fireEvent.touchMove(element, createTouchEvent({ x: 90, y: 100 }));
  fireEvent.touchEnd(element, createTouchEvent({}));
};

export const swipeRight = (element: Document | Node | Element) => {
  fireEvent.touchStart(element, createTouchEvent({ x: 100, y: 100 }));
  fireEvent.touchMove(element, createTouchEvent({ x: 110, y: 100 }));
  fireEvent.touchEnd(element, createTouchEvent({}));
};
