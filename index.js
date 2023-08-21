import fs from 'fs';
import inquirer from 'inquirer';
import { Circle, Triangle, Square } from './lib/shapes.js';

const promptUser = async () => {
  const { prompt } = inquirer;
  const data = await prompt([
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
  ]);

  return data;
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
      throw new Error('Invalid shape');
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
