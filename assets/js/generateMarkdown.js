// Generates the markdown for README.md given a data response object.
function generateMarkdown(data) {
	return `# ${data.title}

## Description
${data.description}

${renderLicenseBadge(data.license.split(" "))} 
${generateTableOfContents(data, data.license.split(" "))}
${generateSteps(data.steps)}
${generateUsage(data)}
${renderLicenseSection(data.license.split(" "))}
${generateContributing(data.contribute)}
${generateTests(data.tests)}
${generateQuestions(data.questions)}
`;
}
// If the user selected a license create a license badge.
function renderLicenseBadge(license) {
	license[1] = license[1].replace("(", "").replace(")", "");
	let output = "";
	if (license[1] !== "N/A") {
		output = "## ![" + license[1] + "](https://img.shields.io/badge/license-" + license[0] + "-green?&style=for-the-badge)";
	} 
	return output;
}
// Generate a table of contents based on the sections the user choose to fill out, linking them apporpriately.
function generateTableOfContents(data, license) {
	license[1] = license[1].replace("(", "").replace(")", "");
	let output = "";
	const {username, email} = data.questions;
	if (data.steps.length > 0 || data.usage || license[1] !== "N/A" || data.contribute 
		|| data.tests.lentgh > 0 || username || email) {
		output += "## Table of Contents\n";
	}
	if (data.steps.length > 0) {
		output += "* [Installation](#installation)\n";
	}
	if (data.usage) {
		output += "* [Usage](#usage)\n";
	}
	if (license[1] !== "N/A") {
		output += "* [License](#license)\n";
	}
	if (data.contribute) {
		output += "* [Contributing](#contributing)\n";
	}
	if (data.tests.length > 0) {
		output += "* [Tests](#tests)\n";
	}
	if (username || email) {
		output += "* [Questions](#questions)\n";
	}
	return output;
}
// If the user entered steps for instillation generate the instillation section and number the steps.
function generateSteps(steps) {
	let output = "";
	if (steps.length > 0) {
		output += "## Installation\n";
		steps.forEach(function (element, index) {
			output += (index + 1 + ". " + element + "<br/>\n");
		});
	} 
	return output;
}
// If the user entered usage instructions/examples generate the usage section and include usage instructions/examples.
function generateUsage(data) {
	let output = "";
	if (data.usage) {
		output += "## Usage\n";
		output += data.usage + "<br/>\n";

		if (data.usageExamples) {
			output += "### Examples\n"
			for (let i = 0; i < data.usageExamples.length; i += 2) {
				output += (data.usageExamples[i] + "<br/>\n" + data.usageExamples[i + 1] + "<br/>\n");
			}
		}
	}
	return output;
}
// If the user selected a license a link to a page with more information is generated.
function renderLicenseSection(license) {
	license[1] = license[1].replace("(", "").replace(")", "");
	let output = "";
	if (license[1] !== "N/A") {
		output = `## License
This application is covered under the ${license[0]} License.
For more information visit: ${renderLicenseUrl(license)}
`;
	} 
	return output;
}
// Generates the link to a page with more information on the selected license.
function renderLicenseUrl(license) {
	let output = "";
	if (license[1] !== "N/A") {
		output += "http://choosealicense.com/licenses/" + license[1];
	} 
	return output;
}
// If the user entered guidelines for contributing a contributing section is generated and filled with the guidelines. 
function generateContributing(contributeGuideLines) {
	let output = "";
	if (contributeGuideLines) {
		output += "## Contributing\n";
		output += contributeGuideLines + "\n";
	}
	return output;
}
// If the user entered tests for the application generate a test section and fill it.
function generateTests(tests) {
	let output = "";
	if (tests.length > 0) {
		output += "## Tests\n";
		tests.forEach(function (element) {
			output += (element + "<br/>\n");
		});
	}
	return output;
}
// If the user entered an email or GitHub username, generate a questions section and fill it out,
// incuding additional contact information if necessary.
function generateQuestions(questions) {
	let output = "";
	if (questions.username || questions.email) {
		output += "## Questions\n";
	}
	if (questions.username) {
		output += questions.username + " (https://github.com/" + questions.username + ")<br/>\n";
	}
	if (questions.email) {
		output += "Email: " + questions.email + "\n";
		output += "### Additional Contact Instructions\n" + questions.contact;
	}
	return output;
}

export default generateMarkdown;