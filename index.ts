// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Считаем среднюю скорость нажатия на кнопки мыши</h1>`;

var a_mouse_button_left_speed = [];
var a_mouse_button_middle_speed = [];
var a_mouse_button_right_speed = [];

var mouse_button_struct = { x: 0, y: 0, time: 0 };

var mouse_button_left = mouse_button_struct;
var mouse_button_middle = mouse_button_struct
var mouse_button_right = mouse_button_struct


function arrayAvr(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}


document.addEventListener("mousedown", function (event) {

  if (event.which == 1) {
    mouse_button_left.time = Date.now();
    mouse_button_left.x = event.pageX;
    mouse_button_left.y = event.pageY;
  }
  if (event.which == 2) {
    mouse_button_middle.time = Date.now();
    mouse_button_middle.x = event.pageX;
    mouse_button_middle.y = event.pageY;
  }
  if (event.which == 3) {
    mouse_button_right.time = Date.now();
    mouse_button_right.x = event.pageX;
    mouse_button_right.y = event.pageY;
  }
});

document.onmouseup = function (event) {
  if (event.which === 1) {
    if (mouse_button_left.x == event.pageX && mouse_button_left.y == event.pageY) {
      mouse_button_left.time = Date.now() - mouse_button_left.time;
      a_mouse_button_left_speed.push(mouse_button_left.time);
      console.log(arrayAvr(a_mouse_button_left_speed) + " sec");
    }
  }
  if (event.which === 2) {
    if (mouse_button_middle.x == event.pageX && mouse_button_middle.y == event.pageY) {
      mouse_button_middle.time = Date.now() - mouse_button_middle.time;
      a_mouse_button_middle_speed.push(mouse_button_middle.time);
      console.log(arrayAvr(a_mouse_button_middle_speed) + " sec");
    }
  }
  if (event.which === 3) {
    if (mouse_button_right.x == event.pageX && mouse_button_right.y == event.pageY) {
      mouse_button_right.time = Date.now() - mouse_button_right.time;
      a_mouse_button_right_speed.push(mouse_button_right.time);
      console.log(arrayAvr(a_mouse_button_right_speed) + " sec");
    }
  }
}