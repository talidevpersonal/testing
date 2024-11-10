const transactions = [
    { category: 'Revenue', date: '2023-01-01', value: 1000000 },
    { category: 'Revenue', date: '2024-01-01', value: 1300000 },
    { category: 'Balances', date: '2023-01-01', value: 500000 },
    { category: 'Balances', date: '2024-01-01', value: 515000 },
    { category: 'Outstanding', date: '2023-01-01', value: 700000 },
    { category: 'Outstanding', date: '2024-01-01', value: 660000 },
    { category: 'Limits', date: '2023-01-01', value: 800000 },
    { category: 'Limits', date: '2024-01-01', value: 825000 },
  ];

  const fs = require('fs');

// Define a function to calculate percentage change
const calculatePercentageChange = (oldValue, newValue) => {
  return ((newValue - oldValue) / oldValue) * 100;
};

// Read and process data from JSON file
fs.readFile('./transactions.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const transactions = JSON.parse(data);

  // Step 2: Group data by category and year
  const groupedData = {};

  transactions.forEach(({ category, date, value }) => {
    const year = new Date(date).getFullYear();

    if (!groupedData[category]) {
      groupedData[category] = {};
    }

    if (!groupedData[category][year]) {
      groupedData[category][year] = 0;
    }

    groupedData[category][year] += value; // Aggregate values for each year
  });

  // Step 3: Calculate gainers and losers based on percentage change
  const gainersLosers = [];

  for (const category in groupedData) {
    const years = Object.keys(groupedData[category]).sort();

    for (let i = 1; i < years.length; i++) {
      const year1 = years[i - 1];
      const year2 = years[i];
      const value1 = groupedData[category][year1];
      const value2 = groupedData[category][year2];

      const percentageChange = calculatePercentageChange(value1, value2);

      gainersLosers.push({
        category,
        year1,
        year2,
        gainer: percentageChange > 0 ? percentageChange : 0,
        loser: percentageChange < 0 ? percentageChange : 0,
        percentage: `${percentageChange.toFixed(2)}%`,
      });
    }
  }

  console.log(gainersLosers);
});
