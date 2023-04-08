
const Piedata = [
  {
    label: 'Department A',
    value: 10,
  },
  {
    label: 'Department B',
    value: 20,
  },
  {
    label: 'Department C',
    value: 30,
  },
  {
    label: 'Department D',
    value: 40,
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    
  labels: Piedata.map((data) => data && data.label),
  datasets: [
    {
      label: 'Ideas percentage by each department',
      data: Piedata.map((data) => data && data.value),
      backgroundColor: ['#00FFFF', '#89CFF0', '#0096FF', '#0000FF'],
    },
  ],
};


