const fs = require('fs');

// Define categories for sample data
const categories = ['Revenue', 'Balances', 'Outstanding', 'Limits'];

// Define a function to generate a random date within a given year range
function getRandomDate(startYear, endYear) {
  const start = new Date(`${startYear}-01-01`).getTime();
  const end = new Date(`${endYear}-12-31`).getTime();
  const randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString().split('T')[0];
}

// Define a function to generate random transaction data
function generateRandomTransaction() {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const date = getRandomDate(2010, 2024);
  const value = Math.floor(Math.random() * 5000000) + 100000; // random value between 100k and 5M
  return { category, date, value };
}

// Path to the JSON file
const outputPath = './transactions.json';

// Generate 1 million records
const transactions = [];
console.log('Generating JSON data...');
for (let i = 0; i < 1000000; i++) {
  transactions.push(generateRandomTransaction());
}

// Write data to JSON file
fs.writeFile(outputPath, JSON.stringify(transactions), (err) => {
  if (err) throw err;
  console.log('Data generation complete. JSON file saved.');
});
