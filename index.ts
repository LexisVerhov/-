// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = "<button style=\"height:50px; width: 150px;\" id=\"stat\">Статистика</button><div id=\"stat-div\"></div>";

document.getElementById("stat").addEventListener("click", function (event) {
  document.getElementById("stat-div").innerHTML = "<b>Мышь</b><br>" +
    "Скорость движения мыши: " + mouseSpeedAvr(a_mouse_move_path) + "<br>" +
    "Скорость клика левой кнопкой мыши: " + arrayAvr(a_mouse_button_left_speed) + "<br>" +
    "Скорость клика средней кнопкой мыши: " + arrayAvr(a_mouse_button_middle_speed) + "<br>" +
    "Скорость клика правой кнопкой мыши: " + arrayAvr(a_mouse_button_right_speed) + "<br>" +
    "Скорость прокрутки: " + "<br>" +
    "Скорость отклика скрола мыши: " + "<br><br>" +

    "<b>Клавиатура</b>" + "<br>" +
    "===============" + "<br>" +
    "Скорость печати: " + keyboard_avr_speed_press(a_keyboard_keyspeed) + "<br>";
});




var a_mouse_button_left_speed = [];
var a_mouse_button_middle_speed = [];
var a_mouse_button_right_speed = [];
var a_mouse_move_path = [];

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

function mouseSpeedAvr(array) {
  var speed_array = [];
  var speed = 0;
  var y;
  var x;
  var distance = 0;
  for (var i = 1; i < array.length; i++) {
    x = array[i].x - array[i - 1].x;
    y = array[i].y - array[i - 1].y;
    speed = Math.sqrt(x * x + y * y) / (array[i].time - array[i - 1].time);
    speed_array.push(speed);
  }

  var sum = 0;
  for (var i = 0; i < speed_array.length; i++) {
    sum += speed_array[i];
  }

  return sum / speed_array.length;
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

document.addEventListener("mouseup", function (event) {
  if (event.which === 1) {
    if (mouse_button_left.x == event.pageX && mouse_button_left.y == event.pageY) {
      mouse_button_left.time = Date.now() - mouse_button_left.time;
      a_mouse_button_left_speed.push(mouse_button_left.time);
    }
  }
  if (event.which === 2) {
    if (mouse_button_middle.x == event.pageX && mouse_button_middle.y == event.pageY) {
      mouse_button_middle.time = Date.now() - mouse_button_middle.time;
      a_mouse_button_middle_speed.push(mouse_button_middle.time);
    }
  }
  if (event.which === 3) {
    if (mouse_button_right.x == event.pageX && mouse_button_right.y == event.pageY) {
      mouse_button_right.time = Date.now() - mouse_button_right.time;
      a_mouse_button_right_speed.push(mouse_button_right.time);
    }
  }
});

document.addEventListener("mousemove", function (event) {
  var distance_struct = { x: event.clientX, y: event.clientY, time: Date.now() };
  a_mouse_move_path.push(distance_struct);

});


var a_keyboard_keyspeed = [];

document.addEventListener("keydown", function (event) {
    a_keyboard_keyspeed.push(Date.now());
})

// когда будем считать - расстояния больше 3 секунд в учет не берем между символами
function keyboard_avr_speed_press(array){
      var speed_array = [];
      var time = 0;
      for (var i = 1; i < array.length; i++) {
          time = array[i] - array[i-1];
          if(time < 3000)
              speed_array.push(time);
      }

      var sum = 0;
      for (var i = 0; i < speed_array.length; i++) {
        sum += speed_array[i];
      }

      return sum / speed_array.length;
    }