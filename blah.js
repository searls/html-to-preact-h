const parse5 = require('parse5')
const adapter = require('parse5-htmlparser2-tree-adapter')
const stringifyObject = require('stringify-object')

function h (name, attrs, children) {
  return { name, attrs, children }
}

function toH (node) {
  if (!node) return

  if (node.type === 'tag') {
    return h(node.name, Object.assign({}, node.attribs), node.children.map(toH))
  } else if (node.type === 'text') {
    return node.data
  }
}

function skipAttrs ({ attrs, children }) {
  return children.length === 0 && Object.keys(attrs).length === 0
}

function skipChildren ({ children }) {
  return children.length === 0
}

function toS (h, depth = 1, leadingNewline = false) {
  const indent = '\n' + Array(depth).join('  ')

  if (typeof h === 'string') {
    return (leadingNewline ? indent : '') + stringifyObject(h)
  } else {
    const nestChildren = h.children.length > 1

    return [
      leadingNewline ? indent : '',
      'h(\'', h.name, '\'',
      skipAttrs(h) ? '' : ', ' + stringifyObject(h.attrs, {
        indent: '  ',
        inlineCharacterLimit: 72 - h.name.length - depth * 2
      }),
      skipChildren(h) ? '' : ', ' + h.children.map(child =>
        toS(child, depth + 1, nestChildren)
      ).join(', '),
      nestChildren ? indent + ')' : ')'
    ].join('')
  }
}

const document = parse5.parseFragment(process.argv[2] || '', { treeAdapter: adapter })

const root = document.children[0]

console.log(toS(toH(root)))
