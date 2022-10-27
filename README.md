# React Parallax Mouse

❤️ A lightweight react component to add a mouse parallax effect to your website

💚 Efficient and lag free animations optimized for performance

💙 Using react-spring under the hood for fluid animations

🚀 Ready to use and provided with types

## What is the Mouse Parallax Effect?

➔ The parallax effect creates the illusion of depth when the cursor moves inside a specified container. The child of the container which is farthest from the user moves at the slowest speed, while the nearest child moves at the fastest speed. It uses the mouse cursor position on the container and creates the illusion of depth for the layers visible in the container. For example, your cursor enters the container and the layers start to move away or approach to the cursor.

(Read more at https://smartslider3.com/blog/parallax-effect/)

## Example

➔ An editable example can be found on CodeSandbox below.

[![Edit react-parallax-mouse Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/embed/react-parallax-mouse-example-zjdsy?fontsize=14&hidenavigation=1&theme=dark&view=preview)

## Getting Started

➔ **npm**

```
npm install react-parallax-mouse
```

➔ **yarn**

```
yarn add react-parallax-mouse
```

## Usage

```
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";
```

The library provides you with two components and one hook.

### `MouseParallaxContainer`

➔ The main container in which the effect will take place. It provides a context for all of its children.

### `MouseParallaxChild`

➔ The layer component for the effect. It provides a container for all of its children, which will stay on the same layer. Only works within the `MouseParallaxContainer` component (as direct child or subchild).

### Example

```html
<MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
  <MouseParallaxChild factorX={0.3} factorY={0.5}>
    <img src="example1.jpg" alt="" />
  </MouseParallaxChild>
  <MouseParallaxChild factorX={0.7} factorY={0.8}>
    <img src="example2.jpg" alt="" />
  </MouseParallaxChild>
</MouseParallaxContainer>
```

### `useParallaxOffset`

➔ A hook that gives you direct access to the underlying spring and its values. It can be used to create custom child components.

### Example

```ts
const { x, y } = useParallaxOffset();
```

## Props

### ➔ MouseParallaxContainer

| prop                 | type                         | description                                                                                                                |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| enabled              | boolean (default: true)      | Enables or disables the effect.                                                                                            |
| globalFactorX        | number (default: 1)          | Strength multiplier of the effect on the X axis for every child component                                                  |
| globalFactorY        | number (default: 1)          | Strength multiplier of the effect on the Y axis for every child component                                                  |
| resetOnLeave         | boolean                      | Resets the view to 0:0 offset when the mouse leaves the container                                                          |
| useWindowMouseEvents | boolean                      | Uses the window event handler instead of the container event handler to track mouse movement                               |
| inverted             | boolean                      | Inverts the offset of `ParallaxChildren` on mouse movement                                                                 |
| containerStyle       | React.CSSProperties (Object) | Additional CSS attributes which are applied directly to the parallax container element (equal to `style` on HTML elements) |
| className            | string                       | The class name of the container                                                                                            |
| springConfig         | SpringConfig                 | React Spring Config (https://react-spring.dev/common/configs)                                                              |

### ➔ MouseParallaxChild

| prop            | type                         | description                                                                                                            |
| --------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **factorX** (!) | number                       | Strength factor for the movement on the X axis                                                                         |
| **factorY** (!) | number                       | Strength factor for the movement on the Y axis                                                                         |
| inverted        | boolean                      | Inverts the offset of the specific child element on mouse movement                                                     |
| style           | React.CSSProperties (Object) | Additional CSS attributes which are applied directly to the parallax child element (equal to `style` on HTML elements) |
| className       | string                       | The class name of the child                                                                                            |

---

🚀 https://github.com/choozn

© Copyright 2022 - @choozn
