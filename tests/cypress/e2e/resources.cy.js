import * as R from "ramda";

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

function nameToMonth(name) {
  return monthNameToNum[name];
}

function revertDate(date) {
  const [month, year] = R.split(" ", date);
  return [parseInt(year), nameToMonth(month)];
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
          (tools) => R.evolve({ date: revertDate }, tools),
        )(e.children);
      }),
    )(elems);
  });
}

const notEmpty = R.complement(R.isEmpty);

describe("Resources page", () => {
  describe("When loading the page", () => {
    it("Displays all the tools", () => {
      const expected = [
        {
          name: "ChatGPT",
          affiliated: "OpenAI",
          date: [2022, 10],
          tags: ["Chat", "Research", "Students", "Teachers"],
          link: "https://chat.openai.com/",
          blurb: "A chat application using OpenAI's GPT LLM.",
          description:
            "An online chat application utilizing OpenAI's GPT large language model (LLM) to understand user inputs and generate outputs.",
        },
      ];
      cy.intercept("GET", "/resources.json", {
        statusCode: 200,
        body: expected,
      });
      cy.visit("http://localhost:3000/");
      cy.get('[data-testid="resources"]').click();
      const tools = parseToolsFromPage();
      const parsedTools = tools;
      tools.should("deep.eq", 1);
    });
  });
});
/*
    [expected.name, expected.affiliated, date, expected.blurb, expected.tags]*/
