const { createPromptModule } = require("inquirer");
const inquirer = require("inquirer");

const generateMarkdown = require("./src/generateMarkdown.js");

titleAndDescription().then(function (response) {
    collectSteps().then(function (answers) {
        response.steps = answers;
        return response;
    }).then(function (combinedResponse) {
        usage().then(function (answers) {
            combinedResponse.usage = answers.usage;
            return combinedResponse;
        }).then(function (combinedResponse) {
            collectUsageExamples().then(function (answers) {
                combinedResponse.usageExamples = answers;
                return combinedResponse;
            }).then(function (combinedResponse) {
                collectScreenshots().then(function (answers) {
                    combinedResponse.screenshots = answers;
                    return combinedResponse;
                }).then (function (combinedResponse) {
                    license().then(function (answers) {
                        combinedResponse.license = answers.license;
                        return combinedResponse;
                    }).then(function (combinedResponse) {
                        collectContributors().then(function (answers) {
                            combinedResponse.contributors = answers;
                            return combinedResponse;
                        }).then(function (combinedResponse) {
                            collectTests().then(function (answers) {
                                combinedResponse.tests = answers;
                                return combinedResponse;
                            }).then(function (combinedResponse) {
                                questions().then(function (answers) {
                                    combinedResponse.questions = answers;
                                    return combinedResponse;
                                }).then(console.log);
                            });
                        });
                    });
                });
            });
        });
    });
});

function titleAndDescription() {
    const prompts = [
        {
            type: "input",
            name: "title",
            message: "Enter the title of the project: "
        },
        {
            type: "input",
            name: "description",
            message: "Enter the description of the project: "
        }
    ];
    return inquirer.prompt(prompts);
}

function collectSteps(steps) {
    const prompts = [
        {
            type: "input",
            name: "instillation",
            message: "Enter a step for instillation: "
        },
        {
            type: "confirm",
            name: "again",
            message: "Enter another step?: ",
            default: false
        }
    ];
    return repeat(steps, prompts);
}

function usage() {
    const prompt = [
        {
        type: "input",
        name: "usage",
        message: "Enter instructions for use."
    }];
    return inquirer.prompt(prompt);
}

function collectUsageExamples(examples) {
    const prompts = [
        {
            type: "input",
            name: "usageExample",
            message: "Enter an example for use."
        },
        {
            type: "confirm",
            name: "again",
            message: "Enter another example?: ",
            default: false
        }
    ];
    return repeat(examples, prompts)
}

function collectScreenshots(screenshots) {
    const prompts = [
        {
            type: "input",
            name: "screenshot",
            message: "Enter the name of a screenshot (with file extension) and ensure its located under [root/assets/images]: "
        }, 
        {
            type: "input",
            name: "altText",
            message: "Enter the alt text for the screenshot: "
        },
        {
            type: "confirm",
            name: "again",
            message: "Enter another screenshot?: ",
            default: false
        }
    ];
    return repeat(screenshots, prompts);
}

function license() {
    const prompt = [
        {
            type: "list",
            name: "license",
            message: "Select a license: ",
            choices: [
                "ISC",
                "MIT",
                "Academic Free License v3.0",
                "Apache license 2.0",
                "Artistic license 2.0",
                "Boost Software License 1.0	",
                "BSD 2-clause \"Simplified\" license",
                "BSD 3-clause \"New\" or \"Revised\" license",
                "BSD 3-clause Clear license",
                "Creative Commons license family",
                "Creative Commons Zero v1.0 Universal",
                "Creative Commons Attribution 4.0",
                "Creative Commons Attribution Share Alike 4.0",
                "Do What The F*ck You Want To Public License",
                "Educational Community License v2.0",
                "Eclipse Public License 1.0	",
                "Eclipse Public License 2.0	",
                "European Union Public License 1.1",
                "GNU Affero General Public License v3.0",
                "GNU General Public License family",
                "GNU General Public License v2.0",
                "GNU General Public License v3.0",
                "GNU Lesser General Public License family",
                "GNU Lesser General Public License v2.1",
                "GNU Lesser General Public License v3.0",
                "LaTeX Project Public License v1.3c",
                "Microsoft Public License",
                "Mozilla Public License 2.0",
                "Open Software License 3.0",
                "PostgreSQL License",
                "SIL Open Font License 1.1",
                "University of Illinois/NCSA Open Source License",
                "The Unlicense",
                "zLib License",
                new inquirer.Separator()
            ]
        }
    ];
    return inquirer.prompt(prompt);
}

function collectContributors(contributors) {
    const prompts = [
        {
            type: "input",
            name: "contributor",
            message: "Enter a contributor: "
        },
        {
            type: "confirm",
            name: "again",
            message: "Enter another contributor?: ",
            default: false
        }
    ];
    return repeat(contributors, prompts);
}

function collectTests(tests) {
    const prompts = [
        {
            type: "input",
            name: "test",
            message: "Enter an example of a test (i.e. how to run the application): "
        },
        {
            type: "confirm",
            name: "again",
            message: "Enter another test?: ",
            default: false
        }        
    ];
    return repeat(tests, prompts);
}

function questions() {
    const prompts = [{
            type: "input",
            name: "username",
            message: "Enter your GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address: "
        }
    ];
    return inquirer.prompt(prompts);
}

function repeat(responses, prompts) {
    if (!responses) {
        responses = [];
    }

    return inquirer.prompt(prompts).then(function (answers) {
        if (answers.instillation) {
            responses.push(answers.instillation);
            if (answers.again) {
                return collectSteps(responses);
            }
        } else if (answers.usageExample) {
            responses.push(answers.usageExample);
            if (answers.again) {
                return collectUsageExamples(responses);
            }
        } else if (answers.screenshot) {
            screenshot = "![" + answers.altText + "](assets/images/" + answers.screenshot + ")";
            responses.push(screenshot);
            if (answers.again) {
                return collectScreenshots(responses);
            }
        } else if (answers.contributor) {
            responses.push(answers.contributor);
            if (answers.again) {
                return collectContributors(responses);
            }
        } else if (answers.test) {
            responses.push(answers.test);
            if (answers.again) {
                return collectTests(responses);
            }
        }
        return responses;
    });
}

// Function call to initialize app
init();

// TODO: Create a function to initialize app
function init() {
    // console.log(generateMarkdown(testObj));
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}