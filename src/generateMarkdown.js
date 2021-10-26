function generateMarkdown(data) {
	console.log(data)
	return `# ${data.title}

## Description
${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${generateSteps(data.steps)}

## Usage
${data.usage}

### Examples
${generateUsageExamples(data.usageExamples)}

## License
${renderLicenseBadge(data.license.split(" "))}
${renderLicenseInfo(data.license.split(" "))}
`;
}

function generateSteps(steps) {
	let output = "";
	steps.forEach(function (element, index) {
		output += (index + 1 + ". " + element + "\n");
	});
	return output;
}

function generateUsageExamples(usageExamples) {
	let output = "";
	for(let i = 0; i < usageExamples.length; i += 2){
		output += (usageExamples[i] + "\n\n" + usageExamples[i + 1]);
	}
	return output;
}

function renderLicenseBadge(license) {
	license[1] = license[1].replace("(", "").replace(")", "");
	license[1];
	if (license[0]) {
		return"![" + license[1] + "](https://img.shields.io/badge/license-" + license[0] + "-green?&style=for-the-badge)";
	} else {
		return "";
	}
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseInfo(license) {
	
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

export default generateMarkdown;