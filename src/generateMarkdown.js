function generateMarkdown(data) {
	console.log(data)
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
${generateQuestions(data)}
`;
}

function renderLicenseBadge(license) {
	license[1] = license[1].replace("(", "").replace(")", "");
	let output = "";
	if (license[1] !== "N/A") {
		output = "## ![" + license[1] + "](https://img.shields.io/badge/license-" + license[0] + "-green?&style=for-the-badge)";
	} 
	return output;
}

function generateTableOfContents(data, license) {
	license[1] = license[1].replace("(", "").replace(")", "");
	let output = "";
	const {username, email} = data.questions;
	if (data.steps.length > 0 || data.usage || data.license[1] !== "N/A" || data.contribute 
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

function generateSteps(steps) {
	let output = "";
	if (steps.length > 0) {
		output += "## Installation\n";
		steps.forEach(function (element) {
			output += (element + "\n");
		});
	} 
	return output;
}

function generateUsage(data) {
	let output = "";
	if (data.usage) {
		output += "## Usage\n";
		output += data.usage  + "\n";

		if (data.usageExamples) {
			for (let i = 0; i < data.usageExamples.length; i += 2) {
				output += (data.usageExamples[i] + "\n\n" + data.usageExamples[i + 1]);
			}
		}
	}
	return output;
}

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

function renderLicenseUrl(license) {
	let output = "";
	if (license[1] !== "N/A") {
		output += "http://choosealicense.com/licenses/" + license[1];
	} 
	return output;
}

function generateContributing(contributeGuideLines) {
	let output = "";
	if (contributeGuideLines) {
		output += "## Contributing\n";
		output += contributeGuideLines + "\n";
	}
	return output;
}

function generateTests(tests) {
	let output = "";
	if (tests.length > 0) {
		output += "## Tests\n";
		tests.forEach(function (element) {
			output += (element + "\n");
		});
	}
	return output;
}

function generateQuestions(data) {
	let output = "";
	if (data.username || data.email) {
		output += "## Questions\n";
	}
	if (data.username) {
		output += data.username + "https://github.com/" + data.username + "\n";
	}
	if (data.email) {
		output += data.email + "\n"
		output += "### Additional Contact Instructions\n" + data.contact;
	}
	return output;
}

export default generateMarkdown;