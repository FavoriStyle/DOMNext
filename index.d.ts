declare class ClassList extends Array<string>{
    [Symbol.toPrimitive](): string
}
declare class ChildList extends Array<Element>{
    push(child:Element): number
}
declare class ParentList extends Array<Element>{
    push(parent:Element): never
}
interface Attributes{
    [key: string]: string
}
declare class Element{
    constructor(name: '#text', text: string)
    constructor(name:
        ( 'area'
        | 'base'
        | 'br'
        | 'col'
        | 'command'
        | 'embed'
        | 'hr'
        | 'img'
        | 'input'
        | 'keygen'
        | 'link'
        | 'meta'
        | 'param'
        | 'source'
        | 'track'
        | 'wbr'
        )
    )
    constructor(name: string)
    append(child:Element): this
    isVoid(): boolean
    isText(): boolean
    set?(text: string): this
    setProps?(assigners: Attributes): this
    attachReactComponent(component: React.Component<any, any, any>): void
    [Symbol.toPrimitive](): string
    classList?: ClassList
    childs?: ChildList
    parents?: ParentList
    reactElement: React.DetailedReactHTMLElement<any, any>
    props: Attributes
}
export default Element
