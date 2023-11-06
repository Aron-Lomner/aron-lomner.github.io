import { typeWrighter, sleep } from './utils.js';
import {Particles} from './particles.js';

async function initialize(){
    let greeting = document.getElementById('greeting')
    let pause = typeWrighter(greeting, 'Hello, I\'m')
    await sleep(pause);
    let name = document.getElementById('name');
    pause = typeWrighter(name, 'Aron Lomner');
    await sleep(pause);
    let occupation = document.getElementById('occupation')
    typeWrighter(occupation, 'Fullstack developer');
}

initialize();

let container = document.getElementById('welcome');
let data = {
    isText: true,
    color: '#39FF14',
    font: '18px Verdana',
    text: 'Welcome!'
};

document.fonts.ready.then(() => {
    console.log('eady')
    new Particles(container, data, 5, 30);
})