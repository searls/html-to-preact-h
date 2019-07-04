const ought = require('ought')
const theredoc = require('theredoc')

const subject = require('./index')

let html, result
module.exports = {
  'empty string is empty string' () {
    ought.equal(subject(''), '')
  },
  'text is a printed string' () {
    ought.equal(subject('why hello'), `'why hello'`)
  },
  'a link is a link' () {
    html = theredoc`
      <a href="https://example.com">Great example!</a>
    `

    result = subject(html)

    ought.equal(result, theredoc`
      h('a', {href: 'https://example.com'}, 'Great example!')
    `)
  },
  'no children? no problem' () {
    html = theredoc`
      <div class="foo"></span>
    `

    result = subject(html)

    ought.equal(result, theredoc`
      h('div', {class: 'foo'})
    `)
  },
  'no children or attrs? 1 arg' () {
    html = theredoc`
      <hr/>
    `

    result = subject(html)

    ought.equal(result, theredoc`
      h('hr')
    `)
  },
  'nested stuff nests' () {
    html = theredoc`
      <div id=foo class="lol" data-pants="yes">
        hi<b>bold text</b>. <a href="https://www.google.com/because/long/things" target="_blank">cool</a> beans
      </div>
    `

    result = subject(html)

    ought.equal(result, theredoc`
      h('div', {id: 'foo', class: 'lol', 'data-pants': 'yes'},
        ' hi',
        h('b', {}, 'bold text'),
        '. ',
        h('a', {
          href: 'https://www.google.com/because/long/things',
          target: '_blank'
        }, 'cool'),
        ' beans '
      )
    `)
  },
  'the one stupid SVG file i had in mind when i wrote this dumb module' () {
    html = theredoc`
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="progress-icon">
        <rect width="500" height="500" fill="white"/>
        <path id="section-8" fill-rule="evenodd" clip-rule="evenodd" d="M218.198 20.498C172.127 26.5262 130.245 45.4684 96.4956 73.4726L154.879 130.476C173.161 116.569 194.703 106.555 218.198 101.712V20.498Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-7" d="M14.1095 225.791C18.8202 181.517 36.3075 140.95 62.9087 107.665L121.675 165.042C109.203 182.93 100.536 203.549 96.8105 225.791H14.1095Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-6" d="M120.807 334.753C108.414 316.592 99.9146 295.681 96.4734 273.157H14C18.5171 317.577 35.891 358.306 62.437 391.743L120.807 334.753Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-5" d="M95.9137 426.043C129.763 454.313 171.862 473.439 218.198 479.502V399.341C194.184 394.39 172.21 384.039 153.672 369.649L95.9137 426.043Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-4" d="M266.71 401.813C292.993 399.167 317.338 390.139 338.093 376.345L395.781 432.67C359.674 460.178 315.199 477.705 266.71 481V401.813Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-3" d="M486 273.157C481.11 321.246 461.152 365.007 430.8 399.877L373.495 343.926C389.572 323.779 400.568 299.578 404.605 273.157H486Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-2" d="M404.268 225.791C399.893 199.675 388.706 175.795 372.546 155.949L430.304 99.5553C460.712 134.263 480.79 177.854 485.89 225.791H404.268Z" stroke="#4F4F4F" stroke-width="4"/>
        <path id="section-1" d="M266.71 99.2392V19C314.928 22.2768 359.176 39.6261 395.174 66.8698L336.804 123.86C316.334 110.544 292.451 101.831 266.71 99.2392Z" stroke="#4F4F4F" stroke-width="4"/>
        </g>
      </svg>
    `

    result = subject(html)

    ought.equal(result, theredoc`
      h('svg', {
        width: '500',
        height: '500',
        viewBox: '0 0 500 500',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
      }, h('g', {id: 'progress-icon'},
          h('rect', {width: '500', height: '500', fill: 'white'}),
          h('path', {
            id: 'section-8',
            'fill-rule': 'evenodd',
            'clip-rule': 'evenodd',
            d: 'M218.198 20.498C172.127 26.5262 130.245 45.4684 96.4956 73.4726L154.879 130.476C173.161 116.569 194.703 106.555 218.198 101.712V20.498Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-7',
            d: 'M14.1095 225.791C18.8202 181.517 36.3075 140.95 62.9087 107.665L121.675 165.042C109.203 182.93 100.536 203.549 96.8105 225.791H14.1095Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-6',
            d: 'M120.807 334.753C108.414 316.592 99.9146 295.681 96.4734 273.157H14C18.5171 317.577 35.891 358.306 62.437 391.743L120.807 334.753Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-5',
            d: 'M95.9137 426.043C129.763 454.313 171.862 473.439 218.198 479.502V399.341C194.184 394.39 172.21 384.039 153.672 369.649L95.9137 426.043Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-4',
            d: 'M266.71 401.813C292.993 399.167 317.338 390.139 338.093 376.345L395.781 432.67C359.674 460.178 315.199 477.705 266.71 481V401.813Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-3',
            d: 'M486 273.157C481.11 321.246 461.152 365.007 430.8 399.877L373.495 343.926C389.572 323.779 400.568 299.578 404.605 273.157H486Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-2',
            d: 'M404.268 225.791C399.893 199.675 388.706 175.795 372.546 155.949L430.304 99.5553C460.712 134.263 480.79 177.854 485.89 225.791H404.268Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          }),
          h('path', {
            id: 'section-1',
            d: 'M266.71 99.2392V19C314.928 22.2768 359.176 39.6261 395.174 66.8698L336.804 123.86C316.334 110.544 292.451 101.831 266.71 99.2392Z',
            stroke: '#4F4F4F',
            'stroke-width': '4'
          })
        ))
    `)
  }
}
