// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = "<button style=\"height:50px; width: 150px;\" id=\"stat\">Статистика</button><br><input style=\"margin:10px 0 10px 0;\" placeholder=\"Нужно ввести что-то для теста\"></input><div id=\"stat-div\"></div>";

document.getElementById("stat").addEventListener("click", function (event) {
  document.getElementById("stat-div").innerHTML = "<b>Мышь</b><br>" +
    "Скорость движения мыши: " + mouseSpeedAvr(a_mouse_move_path) + "<br>" +
    "Скорость клика левой кнопкой мыши: " + arrayAvr(a_mouse_button_left_speed) + "<br>" +
    "Скорость между прокруткой: " + scroll_calculate(array_scroll) + "<br><br>" +

    "<b>Клавиатура</b>" + "<br>" +
    "===============" + "<br>" +
    "Скорость нажатия клавиш: " + arrayAvr(a_keyboard_keydown_speed) + "<br>" +
    "Скорость печати: " + keyboard_avr_speed_press(a_keyboard_keyspeed) + "<br>";
});




var a_mouse_button_left_speed = [];
var a_mouse_move_path = [];

var mouse_button_struct = { x: 0, y: 0, time: 0 };

var mouse_button_left = mouse_button_struct;






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
    mouse_button_left.x = event.clientX;
    mouse_button_left.y = event.clientY;
  }
});

document.addEventListener("mouseup", function (event) {
  if (event.which === 1) {
    if (mouse_button_left.x == event.clientX &&
        mouse_button_left.y == event.clientY){
        mouse_button_left.time = Date.now() - mouse_button_left.time;
        if(mouse_button_left.time > 15){
            a_mouse_button_left_speed.push(mouse_button_left.time);
           }
        }
    }
})

document.addEventListener("mousemove", function (event) {
  var distance_struct = { x: event.clientX, y: event.clientY, time: Date.now() };
  a_mouse_move_path.push(distance_struct);

});


var s_keyboard_down = {keycode:0,time:0};

var a_keyboard_keyspeed = []; // скорость нажатия от клавиши к клавише
var a_keyboard_keydown_speed = []; // время нажал - отпустил одну и ту же кнопку

document.addEventListener("keydown", function (event) {
  a_keyboard_keyspeed.push(Date.now());
  s_keyboard_down.keycode = event.keyCode;
  s_keyboard_down.time = Date.now();
})

document.addEventListener("keyup", function (event) {
  if(event.keyCode == s_keyboard_down.keycode)
    var speed = Date.now()-s_keyboard_down.time;
    if(speed > 4)
      a_keyboard_keydown_speed.push(Date.now()-s_keyboard_down.time);
})

// когда будем считать - расстояния больше 3 секунд в учет не берем между символами
function keyboard_avr_speed_press(array) {
  var speed_array = [];
  var time = 0;
  for (var i = 1; i < array.length; i++) {
    time = array[i] - array[i - 1];
    if (time < 3000)
      speed_array.push(time);
  }

  var sum = 0;
  for (var i = 0; i < speed_array.length; i++) {
    sum += speed_array[i];
  }

  return sum / speed_array.length;
}




    var array_scroll = [];
    document.addEventListener("wheel", function(event) {
        array_scroll.push(Date.now());
    });

    function scroll_calculate(array){
        var time_array = [];
        for(var i = 1; i<array.length; i++){
          var time = (array[i]-array[i-1]);
          if(time < 500){
              time_array.push(array[i]-array[i-1]);
          }
        }
        var time_avg = arrayAvr(time_array);
        return time_avg;
    }
