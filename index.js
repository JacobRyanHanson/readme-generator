import inquirer from "inquirer";
import fs from 'fs';
import generateMarkdown from "./src/generateMarkdown.js";

init();

function init() {
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
                    license().then(function (answers) {
                        combinedResponse.license = answers.license;
                        return combinedResponse;
                    }).then(function (combinedResponse) {
                        contributing().then(function (answers) {
                            combinedResponse.contribute = answers.contribute;
                            return combinedResponse;
                        }).then(function (combinedResponse) {
                            collectTests().then(function (answers) {
                                combinedResponse.tests = answers;
                                return combinedResponse;
                            }).then(function (combinedResponse) {
                                questions().then(function (answers) {
                                    combinedResponse.questions = answers;
                                    return combinedResponse;
                                }).then(generateMarkdown).then(function (markdown) {
                                    console.log(markdown)
                                    writeToFile("./dist/README.md", markdown);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, function (error) {
        if (error) {
            console.error(error);
            return;
        }
    });
}

function titleAndDescription() {
    const prompts = [
        {
            type: "input",
            name: "title",
            message: "Enter the title of the project: ",
            validate: function (titleInput) {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a title!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Enter the description of the project: ",
            validate: function (descriptionInput) {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description!");
                    return false;
                }
            }
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
        message: "Enter instructions for use: "
    }];
    return inquirer.prompt(prompt);
}

function collectUsageExamples(examples) {
    const prompts = [
        {
            type: "input",
            name: "usageExample",
            message: "Enter an example of use: "
        },
        {
            type: "input",
            name: "screenshot",
            message: "Enter the name of a screenshot (with file extension) and ensure it's located under [root/assets/images]: "
        }, {
            type: "input",
            name: "altText",
            message: "Enter the alt text for the screenshot: "
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

function license() {
    const prompt = [
        {
            type: "list",
            name: "license",
            message: "Select a license: ",
            choices: [
                "None (N/A)",
                "ISC (isc)",
                "MIT (mit)",
                "Academic Free License v3.0 (afl-3.0)",
                "Apache license 2.0 (apache-2.0)",
                "Artistic license 2.0 (artistic-2.0)",
                "Boost Software License 1.0	(bsl-1.0)",
                "BSD 2-clause \"Simplified\" license (bsd-2-clause)",
                "BSD 3-clause \"New\" or \"Revised\" license (bsd-3-clause)",
                "BSD 3-clause Clear license (bsd-3-clause-clear)",
                "Creative Commons license family (cc)",
                "Creative Commons Zero v1.0 Universal (cc0-1.0)",
                "Creative Commons Attribution 4.0 (cc-by-4.0)",
                "Creative Commons Attribution Share Alike 4.0 (	cc-by-sa-4.0)",
                "Do What The F*ck You Want To Public License (wtfpl)",
                "Educational Community License v2.0 (ecl-2.0)",
                "Eclipse Public License 1.0	(epl-1.0)",
                "Eclipse Public License 2.0	(epl-2.0)",
                "European Union Public License 1.1 (eupl-1.1)",
                "GNU Affero General Public License v3.0 (agpl-3.0)",
                "GNU General Public License family (gpl)",
                "GNU General Public License v2.0 (gpl-2.0)",
                "GNU General Public License v3.0 (gpl-3.0)",
                "GNU Lesser General Public License family (lgpl)",
                "GNU Lesser General Public License v2.1 (lgpl-2.1)",
                "GNU Lesser General Public License v3.0 (lgpl-3.0)",
                "LaTeX Project Public License v1.3c (lppl-1.3c)",
                "Microsoft Public License (ms-pl)",
                "Mozilla Public License 2.0 (mpl-2.0)",
                "Open Software License 3.0 (osl-3.0)",
                "PostgreSQL License (postgresql)",
                "SIL Open Font License 1.1 (ofl-1.1)",
                "University of Illinois/NCSA Open Source License (ncsa)",
                "The Unlicense (unlicense)",
                "zLib License (zlib)",
                new inquirer.Separator()
            ]
        }
    ];
    return inquirer.prompt(prompt);
}

function contributing() {
    const prompt = [
        {
            type: "input",
            name: "contribute",
            message: "Enter contribution guidlines: "
        }
    ];
    return inquirer.prompt(prompt);
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
        },
        {
            type: "input",
            name: "contact",
            message: "Enter additional contact instructions for further questions: "
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
            const screenshot = "![" + answers.altText + "](assets/images/" + answers.screenshot + ")";
            responses.push(screenshot);
            if (answers.again) {
                return collectUsageExamples(responses);
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