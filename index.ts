import Element from './index.d'
import DOMElement from './DOM'
const TypedElement: (typeof Element) = DOMElement as any
export default TypedElement
