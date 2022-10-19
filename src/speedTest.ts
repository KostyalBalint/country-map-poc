import { countryToAlpha2 } from "country-to-iso";
import { testData } from "./testData";

const dataCount = 100000;

console.log(`Run each solution ${dataCount} times`);

let totalTime = 0;

console.table(testData.map((data) => {

  //Create test suites for each country
  //Run the function 10.000 times and measure the time
  const startTime = performance.now();
  for (let i = 0; i < dataCount; i++) {
    countryToAlpha2(data.country);
  }
  const delta = performance.now() - startTime;
  totalTime += delta;

  //Print out the time and throughput
  return {
    Country: data.country,
    "Resulted Code": countryToAlpha2(data.country),
    'Time (ms)': delta.toFixed(2),
    'Throughput (calls/ms)': (dataCount / delta).toFixed(2),
  }
}));

console.log(`Average time: ${(dataCount / (totalTime / testData.length)).toFixed(2)} calls/ms`);