/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-17 18:43:26
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-18 15:55:23
 * @FilePath: \antd-cms\src\pages\Home\test.ts
 */
export const rules = [
  {
    id: 1,
    label: '201路',
    from: null,
    to: 2
  },
  {
    id: 2,
    label: '202路',
    from: 1,
    to: 3
  },
  {
    id: 3,
    label: '203路',
    from: 2,
    to: 4
  },
  {
    id: 4,
    label: '204路',
    from: 3,
    to: 5
  },
  {
    id: 5,
    label: '205路',
    from: 4,
    to: 1
  }
]

export const exampleNodes = [
  {
    id: 1,
    label: '201路-全',
    from: 13,
    to: 2,
    nodeType: 'root'
  },
  {
    id: 2,
    label: '202路-全',
    from: 1,
    to: [4, 5],
    nodeType: 'common'
  },
  {
    id: 3,
    from: 2,
    nodeType: 'diverge',
    children: [
      {
        id: 4,
        label: '203路-上',
        from: 2,
        to: 7
      },
      {
        id: 5,
        label: '203路-下',
        from: 2,
        to: 8
      }
    ]
  },

  {
    id: 6,
    nodeType: 'double',
    children: [
      {
        id: 7,
        label: '204路-全',
        from: 4,
        to: 10
      },
      {
        id: 8,
        label: '休息',
        from: 5,
        to: 11
      }
    ]
  },

  {
    id: 9,
    nodeType: 'double',
    children: [
      {
        id: 10,
        label: '请假',
        from: 7,
        to: 12
      },
      {
        id: 11,
        label: '205路-全',
        from: 8,
        to: 12
      }
    ]
  },
  {
    id: 12,
    label: '202路-全',
    from: [10, 11],
    to: 13,
    nodeType: 'merge'
  },
  {
    id: 13,
    label: '301路',
    from: 12,
    to: 1,
    nodeType: 'common'
  }
]


export const exampleNodes2 = [
  {
    id: 1,
    label: '201路-全',
    from: 13,
    to: 2,
    nodeType: 'root'
  },
  {
    id: 2,
    label: '202路-全',
    from: 1,
    to: [4, 5],
    nodeType: 'common'
  },
  {
    id: 3,
    from: 2,
    nodeType: 'diverge',
    children: [
      {
        id: 4,
        label: '203路-上',
        from: 2,
        to: 7
      },
      {
        id: 5,
        label: '203路-下',
        from: 2,
        to: 8
      }
    ]
  },
  {
    id: 6,
    nodeType: 'double',
    children: [
      {
        id: 7,
        label: '204路-全',
        from: 4,
        to: 10
      },
      {
        id: 8,
        label: '休息',
        from: 5,
        to: 11
      }
    ]
  },
  {
    id: 9,
    nodeType: 'double',
    children: [
      {
        id: 10,
        label: '请假',
        from: 7,
        to: 12
      },
      {
        id: 11,
        label: '205路-全',
        from: 8,
        to: 12
      }
    ]
  },
  {
    id: 12,
    label: '202路-全',
    from: [10, 11],
    to: 13,
    nodeType: 'merge'
  },
  {
    id: 13,
    label: '301路',
    from: 12,
    to: [15, 16],
    nodeType: 'common'
  },
  {
    id: 14,
    from: 13,
    nodeType: 'diverge',
    children: [
      {
        id: 15,
        label: '203路-上',
        from: 13,
        to: 18
      },
      {
        id: 16,
        label: '203路-下',
        from: 13,
        to: 19
      }
    ]
  },
  {
    id: 17,
    nodeType: 'double',
    children: [
      {
        id: 18,
        label: '请假',
        from: 15,
        to: 12
      },
      {
        id: 19,
        label: '205路-全',
        from: 16,
        to: 12
      }
    ]
  }
]