# Country Mapping Poc

Testing out different country map implementations.

## Conslusion
#### Solution 1 is the best solution, it's the most maintainable, and it's the most usable

- We don't need to trim the input data, but special chars like `;` or `:` will break the processing. We can use a regex to remove those chars.'
- Also if we wish to use this for detecting countries in a sentence we have to use preprocessing to tokenize the sentence and then use the country mapping.
- Average throughout is: 1587.26 calls/ms

## Results

```bash
┌──────────────────────┬───────────────┬────────────┬────────────┬────────────┐
│       Country        │ Expected Code │ Solution 1 │ Solution 2 │ Solution 3 │
├──────────────────────┼───────────────┼────────────┼────────────┼────────────┤
│   'United States'    │     'US'      │    'US'    │ undefined  │    'US'    │
│   'United Kingdom'   │     'GB'      │    'GB'    │ undefined  │    'GB'    │
│    'Magyarország'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│    'Magyarorszag'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│    'MAGYARORSZÁG'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│    'MAGYARORSZAG'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│      'Hungary'       │     'HU'      │    'HU'    │    'HU'    │ undefined  │
│      'HUNGARY'       │     'HU'      │    'HU'    │    'HU'    │ undefined  │
│    'magyarország'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│    'magyárorszag'    │     'HU'      │    'HU'    │ undefined  │ undefined  │
│        'Hun'         │     'HU'      │    'HU'    │ undefined  │ undefined  │
│       'hungry'       │     'HU'      │    null    │ undefined  │ undefined  │
│       'magyar'       │     'HU'      │    null    │ undefined  │ undefined  │
│   'Magyar Ország'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│    'maGYArorSzáG'    │     'HU'      │    'HU'    │ undefined  │    'HU'    │
│ '   maGYArorSzáG;. ' │     'HU'      │    null    │ undefined  │ undefined  │
│  '   maGYArorSzáG '  │     'HU'      │    'HU'    │ undefined  │ undefined  │
│      'Total: '       │      17       │     14     │     2      │     9      │
└──────────────────────┴───────────────┴────────────┴────────────┴────────────┘

```

## Throughput test on Solution 1
 
```bash
Run each solution 100000 times
┌──────────────────────┬───────────────┬───────────┬───────────────────────┐
│       Country        │ Resulted Code │ Time (ms) │ Throughput (calls/ms) │
├──────────────────────┼───────────────┼───────────┼───────────────────────┤
│   'United States'    │     'US'      │  '79.23'  │       '1262.15'       │
│   'United Kingdom'   │     'GB'      │  '81.41'  │       '1228.33'       │
│    'Magyarország'    │     'HU'      │  '62.69'  │       '1595.12'       │
│    'Magyarorszag'    │     'HU'      │  '46.43'  │       '2153.59'       │
│    'MAGYARORSZÁG'    │     'HU'      │  '60.18'  │       '1661.57'       │
│    'MAGYARORSZAG'    │     'HU'      │  '41.85'  │       '2389.74'       │
│      'Hungary'       │     'HU'      │  '43.42'  │       '2303.20'       │
│      'HUNGARY'       │     'HU'      │  '39.96'  │       '2502.70'       │
│    'magyarország'    │     'HU'      │  '66.40'  │       '1506.13'       │
│    'magyárorszag'    │     'HU'      │  '62.98'  │       '1587.80'       │
│        'Hun'         │     'HU'      │  '50.43'  │       '1983.03'       │
│       'hungry'       │     null      │  '43.36'  │       '2306.09'       │
│       'magyar'       │     null      │  '43.11'  │       '2319.70'       │
│   'Magyar Ország'    │     'HU'      │  '79.39'  │       '1259.67'       │
│    'maGYArorSzáG'    │     'HU'      │  '61.49'  │       '1626.34'       │
│ '   maGYArorSzáG;. ' │     null      │ '112.98'  │       '885.15'        │
│  '   maGYArorSzáG '  │     'HU'      │  '95.73'  │       '1044.59'       │
└──────────────────────┴───────────────┴───────────┴───────────────────────┘
```

### Solution 1 - node-country-to-iso package: 
https://www.npmjs.com/package/country-to-iso
- **Pros:** Properly maps langueged and edge case country names
- **Cons:** Only around 1800 weekly downloads, not that popular or maintained
```typescript

const solution1 = (country: string): string | null => {
    return countryToAlpha2(country);
};
```

### Solution 2 - country-list package
- **Pros:** A Lot of weekly downloads, maintained
- **Cons:** Doesn't map edge case, or even languaged country names
```typescript
const solution2 = (country: string): string | undefined => {
  return countryList.getCode(country.toLowerCase());
};
```


### Solution 3 - Custom solution switch case, or even a map
- **Pros:** Can map every edge case and language we encounter
- **Cons:** Too much code, not maintainable, a lot of effort
```typescript
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
    //etc...
  }
};
```