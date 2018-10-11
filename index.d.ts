interface Attributes{
    [key: string]: string
}
declare class ClassList extends Array<string>{
    [Symbol.toPrimitive](): string
}
declare class ChildList extends Array<Elеment>{
    push(child: Elеment): number
}
declare class ParentList extends Array<Elеment>{
    push(parent: Elеment): never
}
declare class Elеment{
    constructor(name: string)
    append(child: Elеment): this
    isVoid(): boolean
    isText(): boolean
    setProps(assigners: Attributes): this
    [Symbol.toPrimitive](): string
    attachReactComponent?: (component: React.Component<any, any, any>) => void
    classList?: ClassList
    childs?: ChildList
    parents: ParentList
    reactElement?: React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>
    props?: Attributes
}
declare class Elеmеnt extends Elеment{
    isVoid(): false
    isText(): false
    classList: ClassList
    childs: ChildList
    props: Attributes
}
declare class VoidElement extends Elеment{
    append(child: Elеment): never
    isVoid(): true
    isText(): false
    classList: ClassList
    childs: ChildList
    props: Attributes
}
declare class TextNode extends Elеment{
    constructor(name: string, text?: string)
    append(child: Elеment): never
    isVoid(): false
    isText(): true
    set(text: string): this
    setProps(assigners: Attributes): never
    classList: undefined
    childs: undefined
    props: undefined
}
declare var ElementClass: {
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
    ): Elеmеnt
    new(name: string): Elеmеnt
}
export default ElementClass
