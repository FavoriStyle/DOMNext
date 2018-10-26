var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var React;
try {
    React = require('react');
}
catch (e) { }
var removeGenerator = Symbol('[[removeGenerator]]');
var _internalCheck = Symbol('[[InternalChecker]]');
var voidElements = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'wbr',
];
var privateProp = (function () {
    var map = new Map();
    function isPrimitive(test) {
        return (test !== Object(test));
    }
    return {
        set: function (_a) {
            var context = _a.context, name = _a.name, value = _a.value, isConstant = _a.const;
            if (isPrimitive(context))
                throw new TypeError('Cannot assign private property to primitive value');
            if (map.has(context)) {
                var target = map.get(context);
                if (target[name]) {
                    if (target[name].const)
                        throw new TypeError('Cannot re-assign constant property');
                    else
                        target[name].value = value;
                }
                else
                    target[name] = { value: value, const: !!isConstant };
            }
            else
                map.set(context, (_b = {}, _b[name] = { value: value, const: !!isConstant }, _b));
            var _b;
        },
        get: function (_a) {
            var context = _a.context, name = _a.name;
            if (map.has(context))
                return (map.get(context)[name] || {}).value;
            else
                return undefined;
        }
    };
})();
var propsRestrictedSymbols = [
    // attribute names
    /"= /
        .toString().slice(1, -1),
    // attribute values
    /"/
        .toString().slice(1, -1)
];
propsRestrictedSymbols.assert = function (i, str) {
    for (var j = 0; j < str.length; j++) {
        if (propsRestrictedSymbols[i].indexOf(str[j]) != -1)
            throw new SyntaxError('String contains an invalid character');
    }
};
var __additionalConstructorEvents = [];
function __buildProps(_this) {
    var res = '';
    for (var i in _this.props)
        res += " " + i + "=" + _this.props[i];
    return res;
}
var ClassList = (function () {
    function ClassList(classListUpdateCB) {
        Object.defineProperty(this, 'length', {
            value: 0,
            enumerable: false,
            configurable: false,
            writable: true
        });
        privateProp.set({ context: this, name: 'classListUpdateCB', value: classListUpdateCB, const: true });
    }
    ClassList.prototype.add = function (className) {
        Array.prototype.push.call(this, className);
        privateProp.get({ context: this, name: 'classListUpdateCB' })(this);
    };
    ClassList.prototype.del = function (className) {
        var i = this.indexOf(className);
        if (i > -1) {
            Array.prototype.splice.call(this, i, 1);
            privateProp.get({ context: this, name: 'classListUpdateCB' })(this);
        }
    };
    ClassList.prototype[Symbol.toPrimitive] = function () {
        return Array.prototype.join.call(this, ' ');
    };
    return ClassList;
})();
ClassList.prototype.indexOf = Array.prototype.indexOf;
ClassList.prototype.push = ClassList.prototype.add;
ClassList.prototype.rem = ClassList.prototype.del;
ClassList.prototype.remove = ClassList.prototype.del;
var ChildList = (function (_super) {
    __extends(ChildList, _super);
    function ChildList() {
        _super.apply(this, arguments);
    }
    ChildList.prototype.push = function (child) {
        if (!(child instanceof Element))
            throw new TypeError('Child is not an instance of Element');
        return this.length;
    };
    return ChildList;
})(Array);
var ParentList = (function (_super) {
    __extends(ParentList, _super);
    function ParentList() {
        _super.apply(this, arguments);
    }
    ParentList.prototype.push = function (parent) {
        throw new TypeError('Cannot assign new parent directly');
    };
    return ParentList;
})(Array);
function __respawnGenerator(_this, to) {
    privateProp.set({ context: _this, name: '__respawnGenerator', value: true });
    if (to)
        clearTimeout(to);
    var attachedComponent = React ? privateProp.get({ context: _this, name: 'reactComponent' }) : false;
    if (attachedComponent)
        to = setTimeout(function () { return attachedComponent.forceUpdate(); }, 0);
    _this.parents.forEach(__respawnGenerator, to);
}
function elementConstructorInterface(_this) {
    Object.defineProperty(_this, 'classList', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ClassList(function (_thisList) {
            _this.props.class = "" + _thisList;
            __respawnGenerator(_this);
        })
    });
    Object.defineProperty(_this, 'props', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new Proxy({}, {
            set: function (target, name, value) {
                var __removeGenerator = value.removeGenerator === removeGenerator;
                if (__removeGenerator)
                    value = value.val;
                propsRestrictedSymbols.assert(0, name);
                propsRestrictedSymbols.assert(1, value);
                target[name] = value;
                if (!__removeGenerator)
                    __respawnGenerator(_this);
                return true;
            }
        })
    });
    if (React)
        Object.defineProperty(_this, 'reactElement', {
            configurable: false,
            enumerable: false,
            get: function () {
                if (privateProp.get({ context: _this, name: '__respawnGenerator' })) {
                    var reactElement = generateReactElement(_this);
                    privateProp.set({ context: _this, name: '__respawnGenerator', value: false });
                    privateProp.set({ context: _this, name: 'reactElement', value: reactElement });
                    return reactElement;
                }
                else
                    return privateProp.get({ context: _this, name: 'reactElement' });
            }
        });
    Object.defineProperty(_this, 'parents', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ParentList
    });
    __additionalConstructorEvents.forEach(function (cb) { return cb(_this); });
    __respawnGenerator(_this);
}
function StyleDecl(styles) {
    var element = document.createElement('style');
    element.innerHTML = ".i{" + styles + "}";
    document.head.appendChild(element);
    var style = element.sheet.cssRules[0].style;
    for (var i = 0; i < style.length; i++) {
        var index = '', nextBig = false;
        for (var j = 0; j < style[i].length; j++) {
            if (nextBig) {
                index += style[i][j].toUpperCase();
                nextBig = false;
            }
            else if (style[i][j] == '-') {
                nextBig = true;
            }
            else
                index += style[i][j];
        }
        this[index] = style[style[i]];
    }
    document.head.removeChild(element);
}
function __processProps(_this) {
    for (var i in _this.props) {
        if (i == 'class') {
            _this.props['className'] = "" + _this.props[i];
            delete _this.props[i];
        }
        if (i == 'style' && !(_this.props.style instanceof StyleDecl))
            _this.props.style = new StyleDecl(_this.props.style);
    }
    return _this.props;
}
function generateReactElement(_this) {
    if (_this.isText())
        return _this + '';
    var childs = [];
    (_this.childs || []).forEach(function (child) {
        childs.push(generateReactElement(child));
    });
    return React.createElement.apply(React, [privateProp.get({
        context: _this,
        name: '_name'
    }), __processProps(_this)].concat(childs));
}
function VoidElement(name) {
    if (arguments[1] !== _internalCheck)
        throw new TypeError('Cannot create VoidElement directly. Use Element instead');
    privateProp.set({
        context: this,
        name: '_name',
        value: name,
        const: true
    });
    elementConstructorInterface(this);
}
function TextNode(text) {
    if (arguments[1] !== _internalCheck)
        throw new TypeError('Cannot create TextNode directly. Use Element instead');
    this.set(text);
    Object.defineProperty(this, 'parents', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ParentList
    });
}
function Element(name, text) {
    if (name == '#text')
        return new TextNode(text, _internalCheck);
    if (voidElements.indexOf(name) != -1)
        return new VoidElement(name, _internalCheck);
    privateProp.set({
        context: this,
        name: '_name',
        value: name,
        const: true
    });
    Object.defineProperty(this, 'childs', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ChildList
    });
    elementConstructorInterface(this);
}
Element.prototype.append = function (child) {
    Array.prototype.push.call(child.parents, this);
    this.childs.push(child);
    __respawnGenerator(this);
    return this;
};
Element.prototype.isVoid = function () {
    return this instanceof VoidElement;
};
Element.prototype.isText = function () {
    return this instanceof TextNode;
};
Element.prototype[Symbol.toPrimitive] = function () {
    var _name = privateProp.get({
        context: this,
        name: '_name'
    });
    var res = "<" + _name + __buildProps(this) + ">";
    this.childs.forEach(function (child) {
        res += child;
    });
    return res + ("</" + _name + ">");
};
Element.prototype.setProps = function (assigns) {
    for (var name in assigns) {
        this.props[name] = { removeGenerator: removeGenerator, val: assigns[name] };
    }
    __respawnGenerator(this);
};
if (React)
    (function () {
        Element.prototype.attachReactComponent = function attachReactComponent(component) {
            var mountedCBs = privateProp.get({ context: this, name: 'mountedCBs' });
            privateProp.set({ context: this, name: 'reactComponent', value: component });
            component.componentDidMount = function componentDidMount() {
                mountedCBs.forEach(function (cb) { return cb(); });
                privateProp.set({ context: this, name: '__mounted', value: true });
            };
        };
        Element.prototype.mounted = function mounted(cb) {
            if (privateProp.get({ context: this, name: '__mounted' }))
                cb();
            else
                privateProp.get({ context: this, name: 'mountedCBs' }).push(cb);
        };
        Element.prototype.click = function click(cb) {
            var clickCBs = privateProp.get({ context: this, name: 'clickCBs' });
            clickCBs.push(cb);
        };
        __additionalConstructorEvents.push(function (_this) {
            var clickCBs = [];
            privateProp.set({ context: _this, name: 'mountedCBs', value: [] });
            privateProp.set({ context: _this, name: 'clickCBs', value: clickCBs });
            privateProp.set({ context: _this, name: '__mounted', value: false });
            _this.props.onClick = function onClick(e) {
                clickCBs.forEach(function (cb) { return cb(e); });
            };
        });
    })();
VoidElement.prototype = Object.create(Element.prototype);
VoidElement.prototype.append = function append(child) {
    throw new TypeError('Cannot assign child to the void (aka singleton) element');
};
VoidElement.prototype[Symbol.toPrimitive] = function () {
    return "<" + privateProp.get({
        context: this,
        name: '_name'
    }) + __buildProps(this) + ">";
};
TextNode.prototype = Object.create(Element.prototype);
TextNode.prototype.set = function set(text) {
    privateProp.set({
        context: this,
        name: '_text',
        value: text.replace('<', '&#60;').replace('>', '&#62;')
    });
};
TextNode.prototype.append = function append(child) {
    throw new TypeError('Cannot assign child to the text element');
};
TextNode.prototype.props = new Proxy({}, {
    set: function (target, name, value) {
        throw new TypeError('Cannot assign property to the text element');
    }
});
TextNode.prototype[Symbol.toPrimitive] = function () {
    return privateProp.get({
        context: this,
        name: '_text'
    });
};
module.exports = Element;
