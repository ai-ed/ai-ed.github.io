# AI-ED

Welcome to AI-ED! This is a platform designed for students, teachers and everyone else who is interested in using AI tools for learning. This repository holds the source code for the website and directory, which can be accessed at: [AI-ED website](https://ai-ed.gith≠ub.io/). 
</br>

![test workflow](https://github.com/ai-ed/ai-ed.github.io/actions/workflows/test.yml/badge.svg)

---
# Contribute


If you are interested in working on the repository and code for the website, visit the [Issues](https://github.com/ai-ed/ai-ed.github.io/issues) to see further development goals and create Pull Requests to the repository, which will be merged on review and approval. Read more about local development and contribution below.


---
# Development

The website uses [GitHub pages](https://pages.github.com/) for serving the site so we decided to use _Jekyll_ to generate the site. `Jekyll` is the tool used by GH pages and doesn't need extra setup.


### File Structure

```
.
├── Gemfile                   # Dependencies list for Ruby
├── Gemfile.lock              # Lock file for Ruby dependencies
├── Procfile                  # Foreman uses the file to start Jekyll and Webpack to serve the files and watch
├── README.md
├── _config.yml               # Configuration for Jekyll
├── babel.config.json         # Babel configuration for Webpack
├── jest.config.js            # Configuration to run tests with jest
├── package.json              # Node dependencies
├── package-lock.json         # Lock file for Node dependencies
├── src                       # Javascript source files (used by Webpack to compile into website/dist)
├── tests                     # Unit tests and acceptance tests
├── docs                      # Contains documentation for the website
├── webpack.config.cjs        # Configuration for Webpack to know where to output the compiled files, etc...
└── website                   # Contains all the website files (.md files, etc)
    ├── _layouts              # Jekyll uses the folder for [layouts](https://jekyllrb.com/docs/step-by-step/04-layouts/) for HTML pages
    ├── dist                  # Webpack compiles all the JS into this folder
    ├── _sass                 # Jekyll uses this folder to style the site, converting [Sass](https://sass-lang.com/) files to css files.
    ├── resources.json        # JSON file with all the resources to show
    └── static                # Static assets folder (images, svg, css, etc)

```
</br>

## Requirements and Setup

Before you begin developing for AI-ED, you'll need to ensure you have the necessary tools and dependencies installed on your system:

* Install [node](https://nodejs.org/en) using [nvm](https://github.com/nvm-sh/nvm)
* Install [ruby](https://www.ruby-lang.org/en/) using [rbenv](https://github.com/rbenv/rbenv)
* Install [bundler](https://bundler.io/) by running `gem install bundler`


To setup the local development environment, do the following:

```
git clone https://github.com/ai-ed/ai-ed.github.io.git
cd ai-ed.github.io
npm install
bundle
```

The next command will have [webpack](https://webpack.js.org/) continuously compile the files and output them in `website/dist`, and will start the Jekyll server at `http://localhost:3000/`.
The _Jekyll_ server will then copy everything under `website` (ignoring all the folders that start with `_` like `_layouts`) to the `_site` folder and serve the files from there. It will also update the browser when the files have changed.

```
`npm run start`
```

---

## Developement Workflow


In terms of working of the website, we have a static JSON database for resources which is parsed using Javascript to display the tools in the directory.

```json
[
    {
        "name":         "ChatGPT",
        "affiliated":	"OpenAI",
        "blurb":        "A chat application using OpenAI's GPT LLM.",
        "description":  "An online chat application utilizing OpenAI's GPT large language model (LLM) to understand user inputs and generate outputs.",
        "released":     "30-10-2022",
        "link":         "https://chat.openai.com/"
    },
]
```

### Creating HTML pages


AI-ED uses a combination of Jekyll and Webpack for development and building the website. _Jekyll_ will convert all the markdown files into HTML. To create an HTML page create a markdown file (.md) and add [front matter](https://jekyllrb.com/docs/front-matter/) to the file to specify the a layout. Here is an example using the _default_ layout:

```md
---
layout: default
---
<div>
  some more info here
</div>
```
Layouts help avoid repeating code in each HTML. Please take a look a the _Jekyll_ [layouts](https://jekyllrb.com/docs/step-by-step/04-layouts/) information for more details.

#### Creating a page for an AI tool

Create an md file using the name of the tool in lowercase and put the tool layout and title of the tool in the front matter like this.

```md
---
layout: tool
title: [title of tool]
---
```

Add the content for the page below the front matter.

#### Adding custom styles

The website uses [Sass](https://sass-lang.com/) and [Bulma](https://bulma.io/) for the styling of the site. If you want to change the styles go to `website/static/styles.scss`. This file contains a mix of Sass and plain CSS. 
**Note**: If you want to change any of Bulma's [initial variables](https://github.com/jgthms/bulma/blob/master/sass/utilities/initial-variables.sass), override them before the line which says `@import "bulma.sass"`.


</br>


For more detailed information on testing, contributing to AI-ED, and other aspects of development, please refer to the following documentation:

- [Testing](./docs/testing.md)
- [Contribute](./docs/contribute.md)

---