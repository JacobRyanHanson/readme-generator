const { createPromptModule } = require("inquirer");
const inquirer = require("inquirer");

const generateMarkdown = require("./src/generateMarkdown.js");


titleAndDescription().then(async function (questionResponse) {
    const collectionResponse = await collectSteps();
    questionResponse.steps = collectionResponse;
    return questionResponse; 
}).then(console.log)

function titleAndDescription() {
    const prompts = [{
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
    const answers = inquirer.prompt(prompts);
    return answers;
}

function collectSteps(steps) {
    const questions = [{
            type: "input",
            name: "instillation",
            message: "Enter the first step for instillation: "
        },
        {
            type: "confirm",
            name: "again",
            message: "Enter another step? ",
            default: true
        }
    ];

    if (!steps) {
        steps = [];
    }

    return inquirer.prompt(questions).then(function (answers) {
        steps.push(answers.instillation);

        if (answers.again) {
            return collectSteps(steps);
        } else {
            return steps;
        }
    });
}





function responses() {
    
        
        // {
        //     type: "list",
        //     name: "license",
        //     message: "Select a license: ",
        //     choices: [
        //         "ISC",
        //         "MIT",
        //         "Academic Free License v3.0",
        //         "Apache license 2.0",
        //         "Artistic license 2.0",
        //         "Boost Software License 1.0	",
        //         "BSD 2-clause \"Simplified\" license",
        //         "BSD 3-clause \"New\" or \"Revised\" license",
        //         "BSD 3-clause Clear license",
        //         "Creative Commons license family",
        //         "Creative Commons Zero v1.0 Universal",
        //         "Creative Commons Attribution 4.0",
        //         "Creative Commons Attribution Share Alike 4.0",
        //         "Do What The F*ck You Want To Public License",
        //         "Educational Community License v2.0",
        //         "Eclipse Public License 1.0	",
        //         "Eclipse Public License 2.0	",
        //         "European Union Public License 1.1",
        //         "GNU Affero General Public License v3.0",
        //         "GNU General Public License family",
        //         "GNU General Public License v2.0",
        //         "GNU General Public License v3.0",
        //         "GNU Lesser General Public License family",
        //         "GNU Lesser General Public License v2.1",
        //         "GNU Lesser General Public License v3.0",
        //         "LaTeX Project Public License v1.3c",
        //         "Microsoft Public License",
        //         "Mozilla Public License 2.0",
        //         "Open Software License 3.0",
        //         "PostgreSQL License",
        //         "SIL Open Font License 1.1",
        //         "University of Illinois/NCSA Open Source License",
        //         "The Unlicense",
        //         "zLib License",
        //         new inquirer.Separator()
        //     ]
        // },
        // {
        //     type: "input",
        //     name: "username",
        //     message: "Enter your GitHub username: "
        // },
        // {
        //     type: "input",
        //     name: "email",
        //     message: "Enter your email address: "
        // }
    // ];
}

    
// collectSteps().then(console.log)
// const testObj = {
//     title: "a",
//     description: "b",
//     license: "ISC",
//     username: "c",
//     email: "d"
// }

// Function call to initialize app
init();

// TODO: Create a function to initialize app
function init() {
    // console.log(generateMarkdown(testObj));
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}