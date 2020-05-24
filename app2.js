const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the employee id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee email?",
  },
  {
    type: "list",
    name: "role",
    message: "What is the employee role?",
    choices: ["Engineer", "Intern", "Manager"],
  },
];
const engineerQuestion = [
  {
    type: "input",
    name: "github",
    message: "What is the employee github username?",
  },
];

const internQuestion = [
  {
    type: "input",
    name: "school",
    message: "What is the intern university?",
  },
];

const managerrQuestion = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager officeNumber?",
  },
];

const addEmployee = [
  {
    type: "list",
    name: "another",
    message: "Would you like to add another employee?",
    choices: ["Yes", "No"],
  },
];

var allEmployees = [];

function displayQuestions() {
  inquirer.prompt(questions).then((initialAnswers) => {
    switch (initialAnswers.role) {
      case "Manager":
        inquirer.prompt(managerrQuestion).then((answer) => {
          const newEmployee = new Manager(
            initialAnswers.name,
            initialAnswers.id,
            initialAnswers.email,
            answer.officeNumber
          );
          allEmployees.push(newEmployee);
          inquirer.prompt(addEmployee).then((ans) => {
            switch (ans.another) {
              case "Yes":
                displayQuestions();
                break;
              case "No":
                
                render(allEmployees);
                break;
            }
          });
        });
        break;
      case "Intern":
        inquirer.prompt(internQuestion).then((answer) => {
          const newEmployee = new Intern(
            initialAnswers.name,
            initialAnswers.id,
            initialAnswers.email,
            answer.school
          );
          allEmployees.push(newEmployee);
          inquirer.prompt(addEmployee).then((ans) => {
            switch (ans.another) {
              case "Yes":
                displayQuestions();
                break;
              case "No":
                render(allEmployees);
                break;
            }
          });
        });

        break;
      case "Engineer":
        inquirer.prompt(engineerQuestion).then((answer) => {
          const newEmployee = new Engineer(
            initialAnswers.name,
            initialAnswers.id,
            initialAnswers.email,
            answer.github
          );
          allEmployees.push(newEmployee);
          inquirer.prompt(addEmployee).then((ans) => {
            switch (ans.another) {
              case "Yes":
                displayQuestions();
                break;
              case "No":
                
                render(allEmployees);
                break;
            }
          });
        });
        break;
    }
  });
}

displayQuestions();
