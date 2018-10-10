declare var ElementClass = (() => {
    class ClassList extends Array<string>{
        [Symbol.toPrimitive](): string
    }
    class ChildList extends Array<Element>{
        push(child:Element): number
    }
    class ParentList extends Array<Element>{
        push(parent:Element): never
    }
    interface Attributes{
        [key: string]: string
    }
    class Element {
        constructor(name: string)
        append(child: Element): this
        isVoid(): false
        isText(): false
        setProps(assigners: Attributes): this
        attachReactComponent?(component: React.Component<any, any, any>): void
        [Symbol.toPrimitive](): string
        classList: ClassList
        childs: ChildList
        parents: ParentList
        reactElement?: React.DetailedReactHTMLElement<any, any>
        props: Attributes
    }
    class VoidElement extends Element{
        constructor()
        append(child: Element): never
        isVoid(): true
        isText(): false
    }
    class TextNode extends Element{
        constructor()
        append(child: Element): never
        isVoid(): false
        isText(): true
        set(text: string): this
        setProps(assigners: Attributes): never
        classList: undefined
        childs: undefined
        props: undefined
    }
    var ElementClass: {
        new(name: '#text', text?: string): TextNode
        new(name:
            ( 'area'
            | 'base'
            | 'br'
            | 'col'
            | 'embed'
            | 'hr'
            | 'img'
            | 'input'
            | 'keygen'
            | 'link'
            | 'meta'
            | 'param'
            | 'source'
            | 'wbr'
            )
        ): VoidElement
        new(name:
            ( 'a'
            | 'article'
            | 'aside'
            | 'body'
            | 'details'
            | 'div'
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'h6'
            | 'head'
            | 'header'
            | 'hgroup'
            | 'html'
            | 'footer'
            | 'nav'
            | 'p'
            | 'section'
            | 'span'
            | 'summary'
            | 'style'
            | 'title'
            | 'button'
            | 'datalist'
            | 'fieldset'
            | 'form'
            | 'label'
            | 'legend'
            | 'meter'
            | 'optgroup'
            | 'option'
            | 'select'
            | 'textarea'
            | 'abbr'
            | 'acronym'
            | 'address'
            | 'b'
            | 'bdi'
            | 'bdo'
            | 'big'
            | 'blockquote'
            | 'cite'
            | 'code'
            | 'del'
            | 'dfn'
            | 'em'
            | 'i'
            | 'ins'
            | 'kbd'
            | 'mark'
            | 'output'
            | 'pre'
            | 'progress'
            | 'q'
            | 'rp'
            | 'rt'
            | 'ruby'
            | 'samp'
            | 'small'
            | 'strong'
            | 'sub'
            | 'sup'
            | 'tt'
            | 'var'
            | 'dd'
            | 'dl'
            | 'dt'
            | 'li'
            | 'ol'
            | 'menu'
            | 'ul'
            | 'caption'
            | 'colgroup'
            | 'table'
            | 'tbody'
            | 'td'
            | 'tfoot'
            | 'thead'
            | 'th'
            | 'tr'
            | 'noscript'
            | 'script'
            | 'audio'
            | 'canvas'
            | 'figcaption'
            | 'figure'
            | 'frame'
            | 'frameset'
            | 'iframe'
            | 'map'
            | 'noframes'
            | 'object'
            | 'time'
            | 'video'
            )
        ): Element
        new(name: string): Element
    };
    return ElementClass
})();
