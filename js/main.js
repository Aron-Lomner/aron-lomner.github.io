import { typeWrighter } from "./utils.js";

async function initialize(){
    let greeting = document.getElementById("greeting")
    let pause = typeWrighter(greeting, "Hello, I'm")
    await sleep(pause);
    let name = document.getElementById("name");
    pause = typeWrighter(name, "Aron Lomner");
    await sleep(pause);
    let occupation = document.getElementById("occupation")
    typeWrighter(occupation, "Fullstack developer");
}

initialize();

async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}