import { countryToAlpha2 } from "country-to-iso";
import * as countryList from "country-list";
import { testData } from "./testData";

/**
 *  Solution 1 - node-country-to-iso package: https://www.npmjs.com/package/country-to-iso
 *  Pros: Properly maps langueged and edge case country names
 *  Cons: Only around 1800 weekly downloads, not that popular or maintained
 */
const solution1 = (country: string): string | null => {
  return countryToAlpha2(country);
};

/**
 * Solution 2 - country-list package
 * Pros: A Lot of weekly downloads, maintained
 * Cons: Doesn't map edge case, or even languaged country names
 */
const solution2 = (country: string): string | undefined => {
  return countryList.getCode(country.toLowerCase());
};

/**
 * Solution 3 - Custom solution switch case, or even a map
 * Pros: Can map every edge case and language we encounter
 * Cons: Too much code, not maintainable, a lot of effort
 */
const solution3 = (country: string): string | undefined => {
  switch (country.toLowerCase()) {
    case "united states":
      return "US";
    case "united kingdom":
      return "GB";
    case "magyarország":
    case "magyarorszag":
    case "magyar ország":
      return "HU";
  }
};

/**
 * Conslusion: Solution 1 is the best solution, it's the most maintainable, and it's the most usable
 */

console.table([
  ...testData.map((data) => {
    return {
      Country: data.country,
      "Expected Code": data.expectedCode,
      "Solution 1": solution1(data.country),
      "Solution 2": solution2(data.country),
      "Solution 3": solution3(data.country),
    };
  }),
  {
    Country: "Total: ",
    "Expected Code": testData.length,
    "Solution 1": testData.filter(
      (data) => solution1(data.country) === data.expectedCode
    ).length,
    "Solution 2": testData.filter(
      (data) => solution2(data.country) === data.expectedCode
    ).length,
    "Solution 3": testData.filter(
      (data) => solution3(data.country) === data.expectedCode
    ).length,
  },
]);
