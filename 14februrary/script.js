function hoverOnLeft(){
    document.getElementById("button_yesd").classList.add("active")
}
function hoverOffLeft(){
    document.getElementById("button_yesd").classList.remove("active")
}
function hoverOnRight(){
    document.getElementById("button_nod").classList.add("active")
}
function hoverOffRight(){
    document.getElementById("button_nod").classList.remove("active")
}

function hideButton() {
    let button = document.getElementById('button_nod');
    button.style.display = 'none';
}

let currentScale = 1;
let clickCount = 0;

function mamaumerla() {
    const yes = document.getElementById("button_yesd")
    yes.style.opacity = '1'
    const button = document.getElementById('button_yesd');
    currentScale += 0.5;
    button.style.transform = `scale(${currentScale})`;
    button.style.transition = `all 0.2s ease`;

    clickCount++;

    if (clickCount >= 5) {
      hideButton();
    }
}

