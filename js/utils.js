/**
 * Simulates typing effect on a given HTML element to display a message.
 * @param {HTMLElement} element - The HTML element to display the typing effect.
 * @param {string} message - The message to be 'typed' on the element.
 * @returns {void}
 */
export function typeWrighter(element, message) {
    let typed = '';
    let c = 0;
    const loop = (i) =>  {
        if (i < message.length) {
            let cursor = c % 10 < 5 ? '|' : '';            
            element.textContent = typed + message[i] + cursor;
            typed += message[Math.floor(i)];
              
            i+=1;
            c++;
            setTimeout(() => loop(i), 100)
        } else {
            element.textContent = typed;
        }
    }
    loop(0);
    return message.length * 100;
}