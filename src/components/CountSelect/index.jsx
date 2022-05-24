const countOptions = [
    {
        value: 5,
        label: "5",
    },
    {
        value: 20,
        label: "20",
    },
    {
        value: 100,
        label: "100",
    },
    {
        value: -1,
        label: "All",
    },
];

const CountSelectComponent = ({ setItemValue }) => {
    return (
        <select
            className="py-3 px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            defaultValue={countOptions[0].value}
            onChange={(event) => setItemValue(parseInt(event.target.value))}
        >
            {countOptions.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default CountSelectComponent;
