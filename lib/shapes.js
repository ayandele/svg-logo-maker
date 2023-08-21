const { Triangle, Circle, Square, Shape } = require('./lib/shapes.js'); // Corrected import statement

// shapes.js

class Shape {
    constructor() {
    this.color = '';
    }

    setColor(color) {
    this.color = color;
    }

    render() {
    throw new Error('Render method not implemented.');
    }
}

class Triangle extends Shape {
    render() {
      // Implement the logic to render a triangle SVG with the given color
    return `<svg width="100" height="100"><polygon points="50,5 90,95 10,95" fill="${this.color}" /></svg>`;
    }
}

class Circle extends Shape {
    render() {
      // Implement the logic to render a circle SVG with the given color
    return `<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="${this.color}" /></svg>`;
    }
}

class Square extends Shape {
    render() {
      // Implement the logic to render a square SVG with the given color
    return `<svg width="100" height="100"><rect width="80" height="80" x="10" y="10" fill="${this.color}" /></svg>`;
    }
}

module.exports = { Triangle, Circle, Square, Shape };


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
