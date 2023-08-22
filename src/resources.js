import Pluralize from 'pluralize'
import * as Handlebars from "handlebars";

const MONTHS = [
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
	"December"
];
/* Headers for a table of resources
const HEADERS = `
	<tr>
		<th>Name</th>
		<th>Affiliated</th>
		<th>Tags</th>
		<th>Released</th>
		<th>Access</th>
	</tr>
`;
*/

/*
function getcol(seed) {
	const sz = 64;
	let cols = [0, 0, 0];

	for (let i = 0, j = 0; i < 3; i++) {
		// 0x1f is the lower 5 bits of seed[j]; value is 0..63
		cols[i] = 0xdf + 2*(seed.charCodeAt(j++) & 0x1f) - 32;
	}

	let col = "#";

	for (const c of cols)
		col += c.toString(16);

	return col;
}
*/

// res: array of resources
// to see what a resource object contains, see resources.json

// first finds the element to store resources (i.e <table>)
// appends a resource element to this collection for every resource in res

const matchingToolsCount = `<p class="info"> {{numOfTools}} matching the filters found </p>`;
const matchingToolsTemplate = Handlebars.compile(matchingToolsCount);

function populate(res) {
    const amountOfTools =  Pluralize("tools", res.length, true);
	  document.getElementById("info").innerHTML = matchingToolsTemplate({numOfTools: amountOfTools});
	let flex = document.getElementById("resources");
	// reset innerHTML of flex container
	flex.innerHTML = "";

	for (let i = 0; i < res.length; i++) {
		let r = res[i];
		let tags = "Tags: ";
		for (let i = 0; i < r.tags.length; i++)
			tags += `${r.tags[i]}${i == r.tags.length - 1 ? "." : ", "}`;

		flex.innerHTML += `
			<div class="resource">
				<h1>${r.name}</h1>
				${
					r.affiliated == r.name ? "" :
					"<h2>" + r.affiliated + "</h2>"
				}
				<h3>${MONTHS[r.date[1] - 1]} ${r.date[0]}</h3>
				<p>${r.blurb}</p>
				<h4>${tags}</h4>
				<div class="buttons">
					<a class="secondary-btn" href="${r.link}">Visit &nearr;</a>
					<a class="primary-btn" href="/resources.html?r=${i}">Learn More</a>
				</div>
			</div>
		`;
	}
}

function populateSingle(res, r_id) {
	let root = document.getElementById("root");
	let r = res[r_id];
	let tags = "Tags: ";

	for (let i = 0; i < r.tags.length; i++)
		tags += `${r.tags[i]}${i == r.tags.length - 1 ? "." : ", "}`;

	root.innerHTML = `
		<div class="col-resource">
			<div class="resource">
				<h1>${r.name}</h1>
				${
					r.affiliated == r.name ? "" :
					"<h2>" + r.affiliated + "</h2>"
				}
				<h3>${MONTHS[r.date[1] - 1]} ${r.date[0]}</h3>
				<p>${r.blurb}</p>
				<h4>${tags}</h4>
				<div class="buttons">
					<a class="secondary-btn" href="${r.link}">Visit &nearr;</a>
				</div>
			</div>
			<a class="primary-btn" href="/resources.html">Go Back</a>
			<h4>If you know more about this resource, feel free to <a href="https://github.com/ai-ed">contribute</a> to AI-ED.</h4>
		</div>
	`;
}

let resources;

// map of all tags
// each entry in map looks like [tag, state]
let tag_enabled = new Map();

// sort_mode: modes (case-sensitive; modes are lowercase):
// newest, oldest, name (alphabetical)
let sort_mode = "newest";

export function filterResources(res, tag_enabled) {
	// if size is 0, then all tags are enabled

    
	let new_res = res;

	// Iterate over each tag in the tag_enabled map
	// Check if the current tag is enabled, ie state is true or false

	let is_enabled = false;

	for (const [tag, state] of tag_enabled) {
		if (state) {
			is_enabled = true;
			// Filter the new_res array based on the enabled tag
			// r.tags.includes(tag) checks if the current resource's tags include the enabled tag. 
			// If yes, it returns true, keeping the resource in the filtered array.
			new_res = new_res.filter((r) => r.tags.includes(tag));
		}
	}

	// if no tags are enabled, then all tags are enabled
	if (!is_enabled)
		return res;

	return new_res;
}

function compareDate(a, b) {
    return new Date(...b.date) - new Date(...a.date);
}


/**
 * Sorts a collection using the `sortMode`
 * @param res a collection of elements of the form `{"name": String, "date": [Int, Int] }`
 * @param sortMode a sorting trait (which can be "newest", "oldest", "name")
 * @return a new collection sorted by `sortMode`
 **/
export function sortResources(res, sortMode) {
    const orderBy = {
        "newest": compareDate,
        "oldest": (a, b) => compareDate(a, b) * -1,
        "name": (a, b) => a.name.localeCompare(b.name)
    }
    const orderedRes = [...res];

    return orderedRes.sort(orderBy[sortMode])
}

function update() {
    const res = [...resources];
	  const filtered = filterResources(res, tag_enabled);
	  const sorted_and_filtered = sortResources(filtered, sort_mode);
	populate(sorted_and_filtered);
}

export const renderTools = async () => {

	try {
		let response = await fetch("/resources.json");
		resources = await response.json();
	} catch {
		console.log("There was an error retrieving the database.");
		return;
	};

	const params = new URLSearchParams(window.location.search);

	if (params.has("r")) {
		let r = parseInt(params.get("r"));

		// update as per a single resource
		populateSingle(resources, r);
	}

	let tags = document.getElementById("tags");

	for (const r of resources) {
		for (const t of r.tags) {
			// check if the map has the tag
			// if it doesn't, create the tag button and add tag in the map
			if (!tag_enabled.has(t)) {

				tag_enabled.set(t, false);

				// create tag button
				// Eg: <span id="tag-btn">Chat</span>
				let e = document.createElement("span");
				e.classList.add("tag-btn");
				e.innerHTML = t;

				// when tag button is clicked
				// change the state of the "true/false value"
				e.onclick = () => {
					tag_enabled.set(t, tag_enabled.get(t) ? false : true);
					e.classList.toggle("enabled");
					update();
				};

				// add tag button to the div with id tags
				tags.appendChild(e);
			}
		}
	}

	// sorting
	// default sort_mode = newest
	// if sorted_by options value changes, update the table

	let sort_by = document.getElementById("sort-by");
	sort_by.onchange = () => {
		sort_mode = sort_by.value;
		update();
	}

	update();
};
