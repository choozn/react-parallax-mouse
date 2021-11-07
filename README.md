# React Parallax Mouse 
❤️ A lightweight react component to add a mouse parallax effect to your website

💚 Efficient and lag free animations optimized for performance

💙 Using react-motion under the hood for fluid animations

## What is the Mouse Parallax Effect?
➔ The parallax effect creates the illusion of depth when the cursor moves inside of a specified container. The child of the container which is farthest from the user moves at the slowest speed, while the nearest child moves at the fastest speed. It uses the mouse cursor position on the container and creates the illusion of depth for the layers visible in container. For example, your cursor enters the slider and the layers start to move away or approach to the cursor.

(Read more at https://smartslider3.com/blog/parallax-effect/)

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

The library provides you with two components.

### ``MouseParallaxContainer``
➔ The main container in which the effect will take place. It takes in an infinite amount of ``MouseParallaxChild`` components as its children.

### ``MouseParallaxChild``
➔ The layer component for the Effect. It provides a container for all of its children, which will stay on the same layer. Only works within the ``MouseParallaxContainer`` component.

### Example

```html
<MouseParallaxContainer>
    <MouseParallaxChild factorX={0.03} factorY={0.05} >
        <img height="50%" src="example1.jpg" alt="" />
    </MouseParallaxChild>
    <MouseParallaxChild factorX={0.07} factorY={0.08}>
        <img height="50%" src="example2.jpg" alt="" />
    </MouseParallaxChild>
</MouseParallaxContainer>
```

## Props

### ➔ MouseParallaxContainer

| prop | type | description  |
| ------ | ------ | ----- |
|resetOnLeave| boolean| Resets the view to 0:0 offset when the mouse leaves the container
|useWindowMouseEvents| boolean | Uses the window event handler instead of the container event handler to track mouse movement
|inverted| boolean | Inverts the offset of ``ParallaxChildren`` on mouse movement
|containerStyles| React.CSSProperties (Object) | Additional CSS attributes which are applied directly to the parallax container element (equal to ``style`` on HTML elements)
|className| string | The class name of the container

### ➔ MouseParallaxChild

| prop | type | description  |
| ------ | ------ | ----- |
|**factorX** (!)| number | Strength factor for the movement on the X axis
|**factorY** (!)| number | Strength factor for the movement on the Y axis
|springConfig| SpringHelperConfig | React Motion Spring Config (https://github.com/chenglou/react-motion#helpers)
|updateStyles| React.CSSProperties (Object) or Middleware Function (Explained below) | Additional CSS attributes which are applied directly to the parallax child element (equal to ``style`` on HTML elements) on each offset calculation - A Middleware function can be used
|className| string | The class name of the child

## Middleware

➔ ``updateStyles`` in the ``MouseParallaxChild`` Props can be supplied with a middleware function instead of a regular CSS styles object. This functions takes in one argument.

```js
updateStyles={(offset) => (
    {
        // Return some kind of CSS styles
    }
)}
```

The offset argument is an object with the following structure:

```js

{
    container: {
        x: number,
        y: number
    },
    px: {
        x: number,
        y: number
    },
    percentage: {
        x: number,
        y: number
    };
}

```

| Middleware |  description  |
| ------ | ----- |
|container| Dimensions of the MouseParallaxContainer |
|px| Offset of the mouse to the middle of the container in pixels |
|percentage| Offset of the mouse to the middle of the container in % |

© choozn - 2021