var React;
try{ React = require('react') } catch(e){}
const removeGenerator = Symbol('[[removeGenerator]]');
const _internalCheck = Symbol('[[InternalChecker]]');
const voidElements = [
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

const privateProp = (() => {
    var map = new Map();
    function isPrimitive(test){
        return (test !== Object(test));
    }
    return {
        set({context, name, value, const: isConstant}){
            if(isPrimitive(context)) throw new TypeError('Cannot assign private property to primitive value');
            if(map.has(context)){
                var target = map.get(context);
                if(target[name]){
                    if(target[name].const) throw new TypeError('Cannot re-assign constant property');
                    else target[name].value = value
                } else target[name] = {value, const: !!isConstant}
            } else map.set(context, {[name]: {value, const: !!isConstant}})
        },
        get({context, name}){
            if(map.has(context)) return (map.get(context)[name] || {}).value;
            else return undefined
        }
    }
})();

const propsRestrictedSymbols = [
    // attribute names
    /"= /
    .toString().slice(1, -1),

    // attribute values
    /"/
    .toString().slice(1, -1)
];

propsRestrictedSymbols.assert = (i, str) => {
    for(var j = 0; j < str.length; j++){
        if(propsRestrictedSymbols[i].indexOf(str[j]) != -1) throw new SyntaxError('String contains an invalid character')
    }
};

const __additionalConstructorEvents = [];

function __buildProps(_this){
    var res = '';
    for(var i in _this.props) res += ` ${i}=${_this.props[i]}`;
    return res
}

class ClassList{
    constructor(classListUpdateCB){
        Object.defineProperty(this, 'length', {
            value: 0,
            enumerable: false,
            configurable: false,
            writable: true
        });
        privateProp.set({ context: this, name: 'classListUpdateCB', value: classListUpdateCB, const: true });
    }
    add(className){
        Array.prototype.push.call(this, className);
        privateProp.get({ context: this, name: 'classListUpdateCB' })(this)
    }
    del(className){
        var i = this.indexOf(className);
        if (i > -1){
            Array.prototype.splice.call(this, i, 1);
            privateProp.get({ context: this, name: 'classListUpdateCB' })(this)
        }
    }
    [Symbol.toPrimitive](){
        return Array.prototype.join.call(this, ' ')
    }
}
ClassList.prototype.indexOf = Array.prototype.indexOf;
ClassList.prototype.push = ClassList.prototype.add;
ClassList.prototype.rem = ClassList.prototype.del;
ClassList.prototype.remove = ClassList.prototype.del;

class ChildList extends Array{
    push(child){
        if(!(child instanceof Element)) throw new TypeError('Child is not an instance of Element');
        return this.length
    }
}

class ParentList extends Array{
    push(parent){
        throw new TypeError('Cannot assign new parent directly');
    }
}

function __respawnGenerator(_this, to){
    privateProp.set({ context: _this, name: '__respawnGenerator', value: true });
    if(to) clearTimeout(to);
    var attachedComponent = React ? privateProp.get({ context: _this, name: 'reactComponent' }) : false;
    if(attachedComponent) to = setTimeout(() => attachedComponent.forceUpdate(), 0)
    _this.parents.forEach(__respawnGenerator, to)
}

function elementConstructorInterface(_this){
    Object.defineProperty(_this, 'classList', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ClassList(_thisList => {
            _this.props.class = `${_thisList}`;
            __respawnGenerator(_this)
        })
    });
    Object.defineProperty(_this, 'props', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new Proxy({}, {
            set(target, name, value){
                var __removeGenerator = value.removeGenerator === removeGenerator;
                if(__removeGenerator) value = value.val;
                propsRestrictedSymbols.assert(0, name);
                propsRestrictedSymbols.assert(1, value);
                target[name] = value;
                if(!__removeGenerator) __respawnGenerator(_this)
                return true
            }
        })
    });
    if(React) Object.defineProperty(_this, 'reactElement', {
        configurable: false,
        enumerable: false,
        get(){
            if(privateProp.get({ context: _this, name: '__respawnGenerator' })){
                var reactElement = generateReactElement(_this);
                privateProp.set({ context: _this, name: '__respawnGenerator', value: false });
                privateProp.set({ context: _this, name: 'reactElement', value: reactElement });
                return reactElement
            } else return privateProp.get({ context: _this, name: 'reactElement' })
        }
    });
    Object.defineProperty(_this, 'parents', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ParentList
    });
    __additionalConstructorEvents.forEach(cb => cb(_this));
    __respawnGenerator(_this)
}
class StyleDecl{
    constructor(styles){
        var element = document.createElement('style');
        element.innerHTML = `.i{${styles}}`;
        document.head.appendChild(element);
        var style = element.sheet.cssRules[0].style;
        for(var i = 0; i < style.length; i++){
            let index = '', nextBig = false;
            for(let j = 0; j < style[i].length; j++){
                if(nextBig){
                    index += style[i][j].toUpperCase();
                    nextBig = false
                } else if(style[i][j] == '-'){
                    nextBig = true;
                } else index += style[i][j]
            }
            this[index] = style[style[i]]
        }
        document.head.removeChild(element)
    }
}

function __processProps(_this){
    for(var i in _this.props){
        if(i == 'class'){
            _this.props['className'] = `${_this.props[i]}`;
            delete _this.props[i]
        }
        if(i == 'style' && !(_this.props.style instanceof StyleDecl)) _this.props.style = new StyleDecl(_this.props.style)
    }
    return _this.props
}

function generateReactElement(_this){
    if(_this.isText()) return _this + '';
    var childs = [];
    _this.childs.forEach(child => {
        childs.push(generateReactElement(child))
    });
    return React.createElement(privateProp.get({
        context: _this,
        name: '_name',
    }), __processProps(_this), ...childs)
}

function VoidElement(name){
    if (arguments[1] !== _internalCheck) throw new TypeError('Cannot create VoidElement directly. Use Element instead');
    privateProp.set({
        context: this,
        name: '_name',
        value: name,
        const: true
    });
    elementConstructorInterface(this)
}

function TextNode(text){
    if (arguments[1] !== _internalCheck) throw new TypeError('Cannot create TextNode directly. Use Element instead');
    this.set(text);
    Object.defineProperty(this, 'parents', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new ParentList
    })
}

class Element{
    constructor(name, text){
        if(name == '#text') return new TextNode(text, _internalCheck);
        if(voidElements.indexOf(name) != -1) return new VoidElement(name, _internalCheck);
        privateProp.set({
            context: this,
            name: '_name',
            value: name,
            const: true,
        });
        Object.defineProperty(this, 'childs', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: new ChildList,
        });
        elementConstructorInterface(this)
    }
    append(child){
        Array.prototype.push.call(child.parents, this);
        this.childs.push(child);
        __respawnGenerator(this)
        return this
    }
    isVoid(){
        return this instanceof VoidElement
    }
    isText(){
        return this instanceof TextNode
    }
    [Symbol.toPrimitive](){
        const _name = privateProp.get({
            context: this,
            name: '_name',
        });
        var res = `<${_name}${__buildProps(this)}>`;
        this.childs.forEach(child => {
            res += child
        });
        return res + `</${_name}>`
    }
    setProps(assigns){
        for(var name in assigns){
            this.props[name] = { removeGenerator, val: assigns[name] };
        }
        __respawnGenerator(this)
    }
}
if(React) (() => {
    Element.prototype.attachReactComponent = function attachReactComponent(component){
        var mountedCBs = privateProp.get({ context: this, name: 'mountedCBs' });
        privateProp.set({ context: this, name: 'reactComponent', value: component });
        component.componentDidMount = function componentDidMount(){
            mountedCBs.forEach(cb => cb());
            privateProp.set({ context: this, name: '__mounted', value: true });
        }
    };
    Element.prototype.mounted = function mounted(cb){
        if(privateProp.get({ context: this, name: '__mounted' })) cb(); else privateProp.get({ context: this, name: 'mountedCBs' }).push(cb)
    };
    Element.prototype.click = function click(cb){
        var clickCBs = privateProp.get({ context: this, name: 'clickCBs' });
        clickCBs.push(cb)
    };
    __additionalConstructorEvents.push(_this => {
        var clickCBs = [];
        privateProp.set({ context: _this, name: 'mountedCBs', value: [] });
        privateProp.set({ context: _this, name: 'clickCBs', value: clickCBs });
        privateProp.set({ context: _this, name: '__mounted', value: false });
        _this.props.onClick = function onClick(e){
            clickCBs.forEach(cb => cb(e))
        }
    })
})();
VoidElement.prototype = Object.create(Element.prototype);
VoidElement.prototype.append = function append(child){
    throw new TypeError('Cannot assign child to the void (aka singleton) element')
};
VoidElement.prototype[Symbol.toPrimitive] = function(){
    return `<${privateProp.get({
        context: this,
        name: '_name',
    })}${__buildProps(this)}>`;
};
TextNode.prototype = Object.create(Element.prototype);
TextNode.prototype.set = function set(text){
    privateProp.set({
        context: this,
        name: '_text',
        value: text.replace('<', '&#60;').replace('>', '&#62;'),
    })
};
TextNode.prototype.append = function append(child){
    throw new TypeError('Cannot assign child to the text element')
};
TextNode.prototype.props = new Proxy({}, {
    set(target, name, value){
        throw new TypeError('Cannot assign property to the text element')
    }
});
TextNode.prototype[Symbol.toPrimitive] = function(){
    return privateProp.get({
        context: this,
        name: '_text',
    })
};
module.exports = Element
