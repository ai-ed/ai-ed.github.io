import * as Handlebars from "handlebars";
const R = require('ramda');
const  {sortResources, filterResources} = require('../src/resources') 

const items = [
    {"name": "a", "date": [2021, 3]},
    {"name": "bell", "date": [2021, 7]},
    {"name": "emil", "date": [2011, 6]},
    {"name": "abe", "date": [2013, 9]},
    {"name": "crane", "date": [2021, 3]}
];


describe('sortResources', () =>{
    describe('When using newest to order', () => {
        it("Sorts by newest date first", () => {
            const orderedByDateDesc = R.sortWith([R.descend(R.prop("date"))], items)
            expect(sortResources(items, "newest")).toEqual(orderedByDateDesc)
        })
    })
    describe('When using oldest to order', () => {
        it("Sorts by oldest date first", () => {
            const orderedByDateAsec = R.sortWith([R.ascend(R.prop("date"))], items)
            expect(sortResources(items, "oldest")).toEqual(orderedByDateAsec)
        })
    })

    describe('When using name to order', () => {
        it("Sorts by name alphabetically", () => {
            const orderedByName = R.sortBy(R.prop("name"), items);
            expect(sortResources(items, "name")).toEqual(orderedByName)
        })
    })

    describe('When using nothing to order', () => {
        it("Does not change the order", () => {
            expect(sortResources(items, "none")).toEqual(items)
        })
    })
})


describe('filterResources', () =>{
    const taggedItems = [
        {"name": "a", "tags": ["1", "2"]},
        {"name": "bell", "tags": ["1", "3"]},
        {"name": "emil", "tags": ["1"]},
        {"name": "abe",  "tags": ["1", "4"]},
        {"name": "crane", "tags": ["2"]}
    ];
    describe('When filtering by a collection of tags', () => {
        it.each([
            [["1"], [["1", true], ["2", false], ["3", false], ["4", false]]],
            [["2", "3"], [["1", false], ["2", true], ["3", true], ["4", false]]],
            [["2", "1"], [["1", true], ["2", true], ["3", false], ["4", false]]]
        ])
        ("Returns every tool with those tags", (filter, tags) => {
            const filteredTags = R.map((tag) => R.includes(tag), filter)
            const hasTags = R.allPass(filteredTags)
            const toolsWithTags = R.filter(R.compose(hasTags, R.prop('tags')), taggedItems) 
            const tagsToFilterBy = new Map(tags)
            expect(filterResources(taggedItems, tagsToFilterBy)).toEqual(toolsWithTags)
        })
    })})
