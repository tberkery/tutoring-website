export default {
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "( /__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:5000"
  },
}