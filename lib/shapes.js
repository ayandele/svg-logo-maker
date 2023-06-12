// class Shape {
//     constructor() {
//     this.color = '';
//     }

//     setColor(color) {
//     this.color = color;
//     }

//     render() {
//     return '';
//     }
// }

// class Triangle extends Shape {
//     render() {
//     return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
//     }
// }

// class Circle extends Shape {
//     render() {
//     return `<circle cx="100" cy="100" r="50" fill="${this.color}" />`;
//     }
// }

const { Triangle, Circle, Square, Shape } = require('./shapes'); // Corrected import statement

const inquirer = require('inquirer');
const fs = require('fs');

const promptUser = () => {
return inquirer.prompt([
    {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: (input) => {
        if (input.length <= 3) {
        return true;
        }
        return 'Please enter up to three characters.';
    },
    },
    {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color:',
    },
    {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square'],
    },
    {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color:',
    },
]);
};

const generateSVG = (data) => {
let shape;
switch (data.shape) {
    case 'circle':
    shape = new Circle();
    break;
    case 'triangle':
    shape = new Triangle();
    break;
    case 'square':
    shape = new Square();
    break;
    default:
    shape = new Shape();
}

shape.setColor(data.shapeColor);

const svgContent = `<svg width="300" height="200">${shape.render()}</svg>`;

fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
    console.error('An error occurred while writing the SVG file:', err);
    } else {
    console.log('Generated logo.svg');
    }
});
};

const run = async () => {
try {
    const userInput = await promptUser();
    generateSVG(userInput);
} catch (error) {
    console.error('An error occurred:', error);
}
};

run();
