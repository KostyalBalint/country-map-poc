export const testData: {
  country: string;
  expectedCode: string;
}[] = [
  {
    country: "United States",
    expectedCode: "US",
  },
  {
    country: "United Kingdom",
    expectedCode: "GB",
  },
  {
    country: "Magyarország",
    expectedCode: "HU",
  },
  {
    country: "Magyarorszag",
    expectedCode: "HU",
  },
  {
    country: "MAGYARORSZÁG",
    expectedCode: "HU",
  },
  {
    country: "MAGYARORSZAG",
    expectedCode: "HU",
  },
  {
    country: "Hungary",
    expectedCode: "HU",
  },
  {
    country: "HUNGARY",
    expectedCode: "HU",
  },
  {
    country: "magyarország",
    expectedCode: "HU",
  },
  {
    country: "magyárorszag",
    expectedCode: "HU",
  },
  {
    country: "Hun",
    expectedCode: "HU",
  },
  {
    country: "hungry",
    expectedCode: "HU",
  },
  {
    country: "magyar",
    expectedCode: "HU",
  },
  {
    country: "Magyar Ország",
    expectedCode: "HU",
  },
];
