const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require ("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptInput () {
  return inquirer.prompt([
    {
    type: "input",
    name: "username",
    message: "Enter your GitHub username:"
    },
    {
      type: "input",
      name: "project",
      message: "Enter your GitHub project title:"
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description for your project:"
    },
    {
      type: "input",
      name: "install",
      message: "Describe the installation instructions for this project:"
    },
    {
      type: "input",
      name: "usage",
      message: "Enter the usage instructions:"
    },
    {
      type: "checkbox",
      name: "license",
      message: "Choose a license for this project:",
      choices: [
        "MIT",
        "MPL-2.0",
        "Apache-2.0",
        "GPL-3.0",
        "Unlicense"
      ]
      },
    {
      type: "input",
      name: "contributors",
      message: "Name the contributors to this project:"
    },
    {
      type: "input",
      name: "tests",
      message: "Describe the tests for this project:"
    },
    {
      type: "input",
      name: "faq",
      message: "Frequently asked questions for this project:"
    }
  ]);
}

  async function init ()
  {
    console.log(`Radical README Generator`);

    try {
      const {username, project, description, install, usage, license, contributors, tests, faq} = await promptInput ();

      const GitHub = await axios.get(`https://api.github.com/users/${username}/events/public`);

      const avatar = GitHub.data[0].actor.avatar_url;

      const badge = "";
      if (license.choices === "MIT") {
        badge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
      } else if (license.choices === "MPL-2.0") {
          badge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
      } else if (license.choices === "Apache-2.0") {
          badge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      } else if (license.choices === "GPL-3.0") {
        badge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      } else if (license.choices === "Unlicense") {
        badge = `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
      }

      return writeFileAsync("Readme.md", generateReadme(badge, avatar, username, project, description, install, usage, license, contributors, tests, faq));
    }
    catch (err) {
      console.log(err);
    }
  }

  function generateReadme(badge, avatar, username, project, description, install, usage, license, contributors, tests, faq)
  {
    return "# Radical README" +
    "\n\n" +
    `<img src="` + badge + `">` +
    "\n\n" +
    `<img src="` + avatar + `" height="60px" width="60px">` +
    "\n\n" +
    "### Username:" + "\n\n" + username +
    "\n\n" +
    "### Project Title:" + "\n\n" + project +
    "\n\n" +
    "### Description:" + "\n\n" + description +
    "\n\n" +
    "### Installation:" + "\n\n" + install +
    "\n\n" +
    "### Usage:" + "\n\n" + usage +
    "\n\n" +
    "### License:" + "\n\n" + license +
    "\n\n" +
    "### Contributing:" + "\n\n" + contributors +
    "\n\n" +
    "### Tests:" + "\n\n" + tests +
    "\n\n" +
    "### Questions:" + "\n\n" + faq +
    "\n\n"
    ;
  };

  init();