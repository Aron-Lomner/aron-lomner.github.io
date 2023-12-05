import { typeWrighter, sleep } from './utils.js';
import {Particles} from './particles.js';

async function initialize(){
    let greeting = document.getElementById('greeting');
    let pause = typeWrighter(greeting, 'Hello, I\'m');
    await sleep(pause);
    let name = document.getElementById('name');
    pause = typeWrighter(name, 'Aron Lomner');
    await sleep(pause);
    let occupation = document.getElementById('occupation')
    typeWrighter(occupation, 'Fullstack Developer');
}

initialize();

let container = document.getElementById('logo');
let settings = {
    isText: false,
    color: '#39FF14',
    font: '18px Verdana',
    text: 'Welcome!',
    imagePath: '/assets/images/logo.png',
    imageWidth: 231,
    imageHeight: 58,
    mouseRadius: 15,
    particleRadius: 1,
    scale: 1,
    container: container,
    weight: 15,
};

if (window.innerWidth < 600) {
    settings.imageHeight = settings.imageHeight / 1.2;
    settings.imageWidth = settings.imageWidth / 1.2;
}

new Particles(settings);
