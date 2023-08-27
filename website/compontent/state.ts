const state = {
  top: 0,
  mouse: [0, 0],
  empty: {
    pages: 0,
    threshold: 4,
    content: [
      {
        tag: '00',
        text: `The Bacchic\nand Dionysiac\nRites` as any,
        images: [
          '/images/BH41NVu.jpg',
          '/images/fBoIJLX.jpg',
          '/images/04zTfWB.jpg',
        ],
      },
      {
        tag: '01',
        text: `The Elysian\nMysteries`,
        images: [
          '/images/c4cA8UN.jpg',
          '/images/ajQ73ol.jpg',
          '/images/gZOmLNU.jpg',
        ],
      },
      {
        tag: '02',
        text: `The Hiramic\nLegend`,
        images: [
          '/images/mbFIW1b.jpg',
          '/images/mlDUVig.jpg',
          '/images/gwuZrgo.jpg',
        ],
      },
    ],
    depthbox: [
      {
        depth: 0 as any,
        color: '#cccccc',
        textColor: '#ffffff',
        text: 'In a void,\nno one could say\nwhy a thing\nonce set in motion\nshould stop anywhere.' as any,
        image: '/images/cAKwexj.jpg',
      } as any,
      {
        depth: -5,
        textColor: '#272727',
        text: 'For why should it stop\nhere rather than here?\nSo that a thing\nwill either be at rest\nor must be moved\nad infinitum.',
        image: '/images/04zTfWB.jpg',
      },
    ],
    lines: [
      {
        points: [
          [-20, 0, 0],
          [-9, 0, 0],
        ] as any,
        color: 'black',
        lineWidth: 0.5,
      },
      {
        points: [
          [20, 0, 0],
          [9, 0, 0],
        ],
        color: 'black',
        lineWidth: 0.5,
      },
    ],
  },
  colors: [
    '#87C4A3',
    '#EF9F64',
    '#9B7FE6',
    '#E794AE',
    '#F4696B',
    '#63C5AB',
    '#F4C3C5',
    '#FEC54F',
    '#98BFF6',
    '#de89ac',
    '#9B7AD5',
    '#FD9372',
    '#ccc5e3',
    '#F68F6F',
    '#3CCAD1',
    '#DFBC94',
    '#FDACB4',
    '#FDACB4',
    '#79BBB5',
    '#A0CADB',
    '#a09de5',
    '#785ebb',
    '#84A5DD',
  ],
  table: () =>
    Array.from({ length: 3 * 18 + 3 * 6 + 1 + 3 }, (value, index) => {
      return {
        No: index + 1,
        cell: 1,
        color: state.colors[Math.floor(Math.random() * state.colors.length)],
      };
    })
      .fill(
        {
          No: 2,
          cell: 16,
          color: state.colors[Math.floor(Math.random() * state.colors.length)],
        },
        1,
        2
      )
      .fill(
        {
          No: 6,
          cell: 10,
          color: state.colors[Math.floor(Math.random() * state.colors.length)],
        },
        5,
        6
      )
      .fill(
        {
          No: 16,
          cell: 9,
          color: state.colors[Math.floor(Math.random() * state.colors.length)],
        },
        15,
        16
      ),
};

export default state;
