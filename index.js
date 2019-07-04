const parse5 = require('parse5')
const adapter = require('parse5-htmlparser2-tree-adapter')
const stringifyObject = require('stringify-object')

module.exports = function htmlToPreactH (html) {
  const dom = parse5.parseFragment(html, { treeAdapter: adapter })

  return toS(toH(dom.children[0]))
}

function toH (node) {
  if (!node) return

  if (node.type === 'tag') {
    return h(
      node.name,
      Object.assign({}, node.attribs),
      node.children.map(toH).filter(e => e)
    )
  } else if (node.type === 'text' && node.data.trim().length > 0) {
    return node.data
  }
}

function toS (h, depth = 1, leadingNewline = false) {
  const indent = '\n' + Array(depth).join('  ')

  if (!h) {
    return ''
  } else if (typeof h === 'string') {
    return (leadingNewline ? indent : '') + stringifyObject(
      // cap leading & trailing whitespace to 1 space
      h.replace(/(^\s+|\s+$)/g, ' ')
    )
  } else {
    const nestChildren = h.children.length > 1

    return [
      leadingNewline ? indent : '',
      'h(\'', h.name, '\'',

      skipAttrs(h) ? '' : ', ' + indentMultiline(stringifyObject(h.attrs, {
        indent: '  ',
        inlineCharacterLimit: 72 - h.name.length - depth * 2
      }), depth),

      skipChildren(h) ? '' : `,${nestChildren ? '' : ' '}` + h.children.map(child =>
        toS(child, depth + 1, nestChildren)
      ).join(`,${nestChildren ? '' : ' '}`),

      nestChildren ? indent + ')' : ')'
    ].join('')
  }
}

function h (name, attrs, children) {
  return { name, attrs, children }
}

function indentMultiline (s, depth) {
  return s.split('\n').join('\n' + Array(depth).join('  '))
}

function skipAttrs ({ attrs, children }) {
  return children.length === 0 && Object.keys(attrs).length === 0
}

function skipChildren ({ children }) {
  return children.length === 0
}
