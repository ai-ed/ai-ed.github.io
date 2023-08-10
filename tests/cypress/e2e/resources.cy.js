import * as R from "ramda";
import * as fc from "fast-check";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthNameToNum = R.zipObj(months, R.range(1, 13));

/**
 * Takes the name of a month and returns the numerical value of the month
 * @param name a string representing the name of the month
 * @returns an integer representing the numerical value of the month
 */
function nameToMonth(name) {
  return monthNameToNum[name];
}

/**
 * takes a date and returns the numerical representation of it
 * @param date a string of the form "[month-name], year"
 * @returns a collection of the form [year, [month-value]]
 */
function revertDate(date) {
  const [month, year] = R.split(" ", date);
  return [parseInt(year), nameToMonth(month)];
}

const noCommas = R.pipe(R.split(","), R.head);
const noPeriods = R.pipe(R.split("."), R.head);

/**
 * Takes the tags and returns them formatted differently
 * @param tags a string representing all the tags for a tool
 * @returns a collection of all the tags
 */
function wrapTags(tags) {
  return R.pipe(
    R.split(" "),
    R.drop(1),
    R.without([","]),
    R.map(noCommas),
    R.map(noPeriods),
  )(tags);
}

/**
 * Extracts all the tools on the resources page
 */
function parseToolsFromPage() {
  return cy.get(".resource").then((elems) => {
    return R.pipe(
      Array.from,
      R.map((e) => {
        return R.pipe(
          Array.from,
          R.take(5),
          R.map(R.prop("innerText")),
          R.zipObj(["name", "affiliated", "date", "blurb", "tags"]),
          R.evolve({ date: revertDate }),
          R.evolve({ tags: wrapTags }),
        )(e.children);
      }),
    )(elems);
  });
}

const removeLinkAndDescription = R.pipe(
  R.dissoc("link"),
  R.dissoc("description"),
);

/**
 * Takes the tools removes the link and description from each one
 * @param tools a collection of tools
 * @returns a collection of tools with each one lacking a link and a description
 */
function prepareTools(tools) {
  return R.map(removeLinkAndDescription, tools);
}

/**
 * Generates an example tool
 */
const toolArb = fc.record({
  name: fc.lorem({ maxCount: 3 }),
  affiliated: fc.lorem({ maxCount: 3 }),
  date: fc
    .date({ min: new Date("2000-01-01T00:00:00.000Z") })
    .map((d) => [d.getYear(), d.getMonth() + 1]),
  tags: fc.array(fc.constantFrom("Chat", "Research", "Students", "Teachers"), {
    minLength: 1,
  }),
  link: fc.constant("https://chat.openai.com/"),
  blurb: fc.lorem({ maxCount: 20 }),
  description: fc.lorem({ maxCount: 2, mode: "sentences" }),
});

/**
 * Generates a list of example tools
 */
const toolListArb = fc.array(toolArb, { minLength: 1, maxLength: 5 });

describe("Resources page", () => {
  describe("When loading the page", () => {
    it("Displays all the tools", () => {
      fc.assert(
        fc.property(toolListArb, (expected) => {
          cy.intercept("GET", "/resources.json", {
            statusCode: 200,
            body: expected,
          });
          cy.visit("http://localhost:3000/");
          cy.get('[data-testid="resources"]').click();
          const actualTools = parseToolsFromPage();
          const expectedTools = prepareTools(expected);
          actualTools.should("to.have.deep.members", expectedTools);
        }),
        { numRuns: 2 },
      );
    });
  });
});
