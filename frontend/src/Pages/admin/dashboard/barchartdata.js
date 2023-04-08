const Bardata = [
    {
        label: 'Department A',
        value: 500
    },
    {
        label: 'Department B',
        value: 1000
    },
    {
        label: 'Department C',
        value: 1500
    },
    {
        label: 'Department D',
        value: 2000
    }
]

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    labels: Bardata.map((data) => data && data.label),
    datasets: [
        {
            label: "Ideas made by each department",
            data: Bardata.map((data) => data && data.value),
            backgroundColor: '#FF0000',
        }
    ],
}