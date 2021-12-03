Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactMotion = require('react-motion');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

// Helper Function to check if a Variable is a Function
var isFunction = function (value) { return value && (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function); };
var MouseParallaxContainer = function (_a) {
    var children = _a.children, resetOnLeave = _a.resetOnLeave, useWindowMouseEvents = _a.useWindowMouseEvents, inverted = _a.inverted, containerStyles = _a.containerStyles, className = _a.className, _b = _a.globalFactorX, globalFactorX = _b === void 0 ? 1 : _b, _c = _a.globalFactorY, globalFactorY = _c === void 0 ? 1 : _c, disableCSSTransition = _a.disableCSSTransition;
    // Convert one Child cases into one dimensional Array to map over
    if (!Array.isArray(children))
        children = [children];
    var _d = React.useState([0, 0]), offset = _d[0], setOffset = _d[1];
    // Container Reference with Callback to use it inside of useEffect
    var _e = React.useState({ current: null }), containerRef = _e[0], setContainerRef = _e[1];
    var containerRefWithCallback = React.useCallback(function (node) { if (node !== null) {
        setContainerRef({ current: node });
    } }, []);
    var getMousePosition = React.useCallback(function (e) {
        var rect = (containerRef.current) ? containerRef.current.getBoundingClientRect() : { left: 0, top: 0 };
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }, [containerRef]);
    var mouseMovementHandler = React.useCallback(function (e) {
        if (containerRef.current) {
            var containerHeight = containerRef.current.clientHeight;
            var containerWidth = containerRef.current.clientWidth;
            var mousePosition = getMousePosition(e);
            var relativeToCenter = [
                containerWidth / 2 - mousePosition.x,
                containerHeight / 2 - mousePosition.y
            ];
            setOffset(relativeToCenter);
        }
    }, [containerRef, getMousePosition, inverted]);
    React.useEffect(function () {
        if (useWindowMouseEvents && containerRef.current) {
            window.addEventListener('mousemove', mouseMovementHandler, false);
            if (resetOnLeave)
                window.addEventListener('mouseout', function () { return setOffset([0, 0]); }, false);
        }
        return function () {
            window.removeEventListener('mousemove', mouseMovementHandler, false);
            if (resetOnLeave)
                window.removeEventListener('mouseout', function () { return setOffset([0, 0]); }, false);
        };
    }, [containerRef, mouseMovementHandler, resetOnLeave, useWindowMouseEvents]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("div", { className: (className) && className, id: "mouse-parallax-container", style: __assign({ overflow: 'hidden', position: 'relative' }, containerStyles), ref: containerRefWithCallback, onMouseMove: (!useWindowMouseEvents) ? mouseMovementHandler : function () { }, onMouseLeave: (resetOnLeave && !useWindowMouseEvents) ? (function () { return setOffset([0, 0]); }) : function () { return null; } }, children.map(function (child, index) { return ((child) && (React__default["default"].createElement(reactMotion.Motion, { key: child.key || index, style: {
                x: reactMotion.spring(offset[0]
                    * (child.props.factorX || 0)
                    * globalFactorX
                    * ((child.props.inverted) ? -1 : 1)
                    * ((inverted) ? -1 : 1), child.props.springConfig),
                y: reactMotion.spring(offset[1]
                    * (child.props.factorY || 0)
                    * globalFactorY
                    * ((child.props.inverted) ? -1 : 1)
                    * ((inverted) ? -1 : 1), child.props.springConfig)
            } }, function (springOffset) {
            var _a, _b, _c, _d;
            var _e, _f;
            // Update Style Injection
            var _g = ["", "", {}], transition = _g[0], transform = _g[1], rest = _g[2];
            if (child.props.updateStyles) {
                if (isFunction(child.props.updateStyles))
                    // Middleware Function
                    (_e = child.props.updateStyles({
                        "container": (containerRef.current) ? { x: containerRef.current.clientWidth, y: containerRef.current.clientHeight } : { x: 0, y: 0 },
                        "px": springOffset,
                        "percentage": (containerRef.current) ? { x: springOffset.x / containerRef.current.clientWidth * 2 * 100, y: springOffset.y / containerRef.current.clientHeight * 2 * 100 } : { x: 0, y: 0 }
                    }), (_a = _e.transition, transition = _a === void 0 ? "" : _a, _b = _e.transform, transform = _b === void 0 ? "" : _b), rest = __rest(_e, ["transition", "transform"]));
                else
                    // CSS Style Object
                    (_f = child.props.updateStyles, (_c = _f.transition, transition = _c === void 0 ? "" : _c, _d = _f.transform, transform = _d === void 0 ? "" : _d), rest = __rest(_f, ["transition", "transform"]));
            }
            var transitionStyle = "" + ((!disableCSSTransition) && "transform 1e-7s linear") + ((transition) && ", ") + transition;
            var transformStyle = "translateX(" + springOffset.x + "px) translateY(" + springOffset.y + "px) " + transform;
            // Apply Styles to each Child
            return (((child.props.factorX || child.props.factorX) || ((child.props.className || child.props.updateStyles) && child.type.name === "MouseParallaxChild"))
                ?
                    React__default["default"].createElement("div", { className: (child.props.className) && child.props.className, style: __assign(__assign({}, ((child.props.factorX || child.props.factorX) ? {
                            willChange: "transform",
                            transition: transitionStyle, WebkitTransition: transitionStyle, msTransition: transitionStyle,
                            transform: transformStyle, WebkitTransform: transformStyle, msTransform: transformStyle
                        } : {})), rest) }, child)
                :
                    React__default["default"].createElement(React__default["default"].Fragment, null, child));
        }))); }))));
};

var MouseParallaxChild = function (_a) {
    var children = _a.children;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        " ",
        children,
        " "));
};

exports.MouseParallaxChild = MouseParallaxChild;
exports.MouseParallaxContainer = MouseParallaxContainer;
//# sourceMappingURL=index.js.map
