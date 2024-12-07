//получаем доступ к элементу время, в него будем добавлять текущее значение времени
const time = document.querySelector('.time');

const dateOut = document.querySelector('.date');
function showDate() {
   const date = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric' };
   const currentDate = date.toLocaleDateString('en-US', options);
   dateOut.textContent = currentDate;
}

const timesOfDay = document.querySelector('.greeting');
function getTimeOfDay() {
   const date = new Date();
   const hours = date.getHours();
   if (6 <= hours && hours < 12) {
      return 'morning';
   } else if (12 <= hours && hours < 18) {
      return 'afternoon';
   } else if (18 <= hours && hours < 24) {
      return 'evening';
   } else if (0 <= hours && hours < 6 || hours === 24) {
      return 'night';
   }
}

//получаем в переменную название текущего времени суток
const timeOfDay = getTimeOfDay();

//Выводим на странице название текущего времени суток
function showGreeting() {
   timesOfDay.textContent = `Good ${getTimeOfDay()}`;
}

function showTime() {
   //встроенный объект JS с текущей датой и временем
   const date = new Date();
   //для того, чтобы отобразить текущее значение времени на страницн будем использовать .textContent и для того, чтобы из date извлечь только время используем метод toLocaleTimeString()
   const currentTime = date.toLocaleTimeString();
   time.textContent = currentTime;
   //выполняем фунцию каждую секунду для того, чтобы отображать секунды
   setTimeout(showTime, 1000);
   showDate();
   showGreeting();
}
showTime();

const inputName = document.querySelector('.name');
console.log(inputName);

function checkNameValue() {
   if (localStorage.getItem('name')) {
      inputName.value = localStorage.getItem('name');
   } else {
      inputName.placeholder = "[Enter name]";
   }
}
checkNameValue();

//сохраняем имя в объект веб-хранилища, который сохраняются после обновления страницы и привязан к источнику (домен/протокол/порт).
function setLocalStorage() {
   localStorage.setItem('name', inputName.value);
}
window.addEventListener('beforeunload', setLocalStorage);

//выводим ранее сохранённое имя на странице
function getLocalStorage() {
   if (localStorage.getItem('name')) {
      inputName.value = localStorage.getItem('name');
      console.log(inputName.value);
   }
}
window.addEventListener('load', getLocalStorage);



const body = document.querySelector('body');

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let randomNum = getRandomInt(1, 21);

//Устанавливаем случайное из имеющихся изображение в зависимости от времени суток
function setBg() {
   const bgNum = randomNum.toString().padStart(2, "0");
   // console.log(bgNum);
   const img = new Image();
   const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
   img.src = url;
   img.onload = () => {
      document.body.style.backgroundImage = `url(${url})`;
   };
}
setBg();

//Стрелка next
const nextArrow = document.querySelector('.slide-next');
function getSlideNext() {
   if (randomNum < 20) {
      randomNum++;
   } else if (randomNum === 20) {
      randomNum = 1;
   }
   // console.log(randomNum);
   setBg();
}
getSlideNext()
nextArrow.addEventListener('click', getSlideNext);

//Стрелка previous
const prevArrow = document.querySelector('.slide-prev');
function getSlidePrev() {
   if (randomNum === 1) {
      randomNum = 20;
   } else if (randomNum <= 20) {
      randomNum--;
   }
   // console.log(randomNum);
   setBg();
}
getSlidePrev()
prevArrow.addEventListener('click', getSlidePrev);

const inputCity = document.querySelector('.city');
function checkCityValue() {
   if (localStorage.getItem('city')) {
      inputCity.value = localStorage.getItem('city');
   } else {
      inputCity.value = "Минск";
   }
}
checkCityValue();






//Сохраняем ранее введенный город в localStorage
function setLocalStorageCity() {
   localStorage.setItem('city', inputCity.value);
}
window.addEventListener('beforeunload', setLocalStorageCity);


//выводим ранее введённый город на странице
function getLocalStorageCity() {
   if (localStorage.getItem('city')) {
      inputCity.value = localStorage.getItem('city');
      // console.log(inputCity.value)
   }
}
window.addEventListener('load', getLocalStorageCity);

//Получаем погоду для определённого города

function setCity(event) {
   if (event.code === 'Enter') {
      getWeather();
      inputCity.blur();
   }
}

//получаем элементы для вывода информации о погоде на страницу
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const progressBarArea = document.querySelector('.progress-area');



//получение погоды через асинхронную функцию
async function getWeather() {


   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=ru&appid=47436074b8a8cd9babd3f7a7404e9236&units=metric`;
   const res = await fetch(url);
   const data = await res.json();

   try {
      weatherIcon.classList = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.clouds.all}%`;
      weatherError.textContent = '';
   }
   catch {
      weatherError.textContent = `Error! city not found for ${inputCity.value}!`;
      weatherIcon.classList = 'weather-icon owf';
      weatherIcon.classList = ``;
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
   }
}
getWeather()
window.addEventListener('load', getWeather);


document.addEventListener('DOMContentLoaded', getWeather);
inputCity.addEventListener('keypress', setCity);


const quotes = [
   {
      "text": "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
      "author": "Стив Макконнелл"
   },
   {
      "text": "Сложность программы растет до тех пор, пока не превысит способности программиста",
      "author": "Артур Блох. Законы Мэрфи"
   },
   {
      "text": "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
      "author": "И. Берард"
   },
   {
      "text": "Что разум человека может постигнуть и во что он может поверить, того он способен достичь",
      "author": "Н. Хилл"
   },
   {
      "text": "Сложнее всего начать действовать, все остальное зависит только от упорства",
      "author": "А. Эрхарт"
   },
   {
      "text": "Логика может привести Вас от пункта А к пункту Б, а воображение — куда угодно",
      "author": "А. Эйнштейн"
   },
   {
      "text": "Настоящая ответственность бывает только личной",
      "author": "Ф. Искандер"
   },
   {
      "text": "Победа - это еще не все, все - это постоянное желание побеждать",
      "author": "В. Ломбарди"
   },
   {
      "text": "Победа - это еще не все, все - это постоянное желание побеждать",
      "author": "В. Ломбарди"
   }
];
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');


function getQuotes() {
   let randomQuotes = getRandomInt(0, quotes.length);
   quoteText.textContent = quotes[randomQuotes].text;
   quoteAuthor.textContent = quotes[randomQuotes].author;
}
getQuotes();

document.querySelector('.change-quote').onclick = getQuotes;

//6. Аудиоплеер 
//воспроизведение без задержек
setTimeout(function () {
   audio.play();
}, 0);

const songName = document.querySelector('.song-details .song-name');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.querySelector('.play');
const audio = new Audio();
let isPlay = false;
const playList = [
   {
      title: 'Aqua Caelestis',
      src: './assets/sounds/Aqua Caelestis.mp3',
      duration: '00:58'
   },
   {
      title: 'Ennio Morricone',
      src: './assets/sounds/Ennio Morricone.mp3',
      duration: '01:37'
   },
   {
      title: 'River Flows In You',
      src: './assets/sounds/River Flows In You.mp3',
      duration: '03:50'
   },
   {
      title: 'Summer Wind',
      src: './assets/sounds/Summer Wind.mp3',
      duration: '01:50'
   }
];


//выводим плей-лист на страницу
const playListContainer = document.querySelector('.play-list');

playList.forEach(function (el, index, arr) {
   const li = document.createElement('li');
   const buttonMusic = document.createElement('button')
   li.classList.add('play-item');
   buttonMusic.classList.add('play-song');
   li.textContent = el.title;
   playListContainer.append(li);
   li.append(buttonMusic);
   buttonMusic.setAttribute("id", `song${index}`);
});



let playNum = 0;


console.log(playList);
console.log(playList.length);

//проигрываем песню по индивидуальной кнопке play
const allPlayBtnSong = document.querySelectorAll('.play-song');
const playBtnSong = document.querySelector('.play-song');
allPlayBtnSong.forEach(song => {
   console.log(song);
   song.addEventListener('click', function (element) {
      //удалим класс с кнопки play   
      document.querySelector('.play').classList.remove('pause');
      let idSong = element.target.id; //получили id песни
      playNum = idSong.replace(/[^0-9]/g, ""); //получили из id номер песни, который присвоили playNum
      if (song.classList.contains('pause')) {
         isPlay = true;
      } else {
         isPlay = false;
      }
      toggleBtn();
      playAudio();
   })
})

//воспроизвести следующую  
function playNext() {
   console.log(playNum);
   if (playNum < playList.length - 1) {
      playNum++;
   } else if (playNum == playList.length - 1) {
      playNum = 0;
   }
   isPlay = false;
   console.log(playNum);
   toggleBtn();
   playAudio();

}
document.querySelector('.play-next').addEventListener('click', playNext);

//воспроизвести предыдущую  
function playPrev() {
   if (playNum === 0) {
      playNum = playList.length - 1;
   } else if (playNum <= playList.length - 1) {
      playNum--;
   }
   isPlay = false;
   toggleBtn();
   playAudio();
}
document.querySelector('.play-prev').addEventListener('click', playPrev);

//после окончания текущей мелодии автоматически воспроизвести следующую
audio.addEventListener('ended', playNext);

// получаем длительность видео через loadeddata (предварительная загрузка длительности). Вешаем его на текущий элемент адио
const durationMusicTime = document.querySelector('.duration-music-time');
audio.addEventListener('loadeddata', () => {
   let audioDuration = audio.duration;
   durationMusicTime.innerText = getTimeCodeFromNum(audioDuration);
})


//отображение времени и положение звуковой дорожки на странице
const currentMusicTime = document.querySelector('.current-music-time');
//отображаем текущее положение звуковой дорожки в зависимости от того, на какой секунде проигрывается мелодия
audio.addEventListener('timeupdate', (event) => {
   const currentTime = event.target.currentTime; //текущее время
   const durationTime = event.target.duration; //общая дительность
   let progressWidth = (currentTime / durationTime) * 100;
   progressBar.style.width = `${progressWidth}%`;
   //выводим текущее время проигрывания трека
   currentMusicTime.textContent = getTimeCodeFromNum(audio.currentTime);
});

//переводим длительность в минуты
function getTimeCodeFromNum(numTime) {
   let currentMin = Math.floor(numTime / 60);
   let currentSeс = Math.floor(numTime % 60);
   if (currentSeс < 10) {
      currentSeс = `0${currentSeс}`;
   }
   if (currentMin < 10) {
      currentMin = `0${currentMin}`;
   }
   return `${currentMin}:${currentSeс}`;
}

//устанавливаем время проигрывания песни через ползунок
progressBarArea.addEventListener('click', (event) => {
   let widthProgressBarVal = progressBarArea.clientWidth;
   let offsetXProgressBar = event.offsetX;
   let setTimePoint = (offsetXProgressBar / widthProgressBarVal) * audio.duration;
   audio.currentTime = setTimePoint;
})

//воспроизведение 
function playAudio() {
   console.log(playNum);
   audio.src = playList[playNum].src;
   songName.innerHTML = playList[playNum].title;
   // audio.currentTime = playCurrentPoint;
   if (!isPlay) {
      audio.play();
      isPlay = true;
      removeCurrentSong(); //удаляем активный класс со всех песен
      addCurrentSong(); //добавляем активный класс текущей песне
      playBtn.classList.add('pause'); //меняем кнопку play на pause
   } else {
      audio.pause();
      isPlay = false;
      toggleBtn();
      playSongsBtns.forEach(el => {
         el.classList.remove('pause');
      })
   }

   console.log(isPlay);
}
playBtn.addEventListener('click', playAudio);


//удалить активный класс со всех песен
function removeCurrentSong() {
   const playListItems = document.querySelectorAll('.play-item');
   const playListItemBtn = document.querySelectorAll('.play-song');
   playListItems.forEach(el => {
      el.classList.remove('item-active');
   })
   playListItemBtn.forEach(el => {
      el.classList.remove('pause');
   })
}



//добавить активный класс текущей песне
function addCurrentSong() {
   const playListItems = document.querySelectorAll('.play-item');
   const playListItemBtn = document.querySelectorAll('.play-song');
   playListItems[playNum].classList.add('item-active');
   playListItemBtn[playNum].classList.add('pause');
}

//переключение иконки play and pause
const playSongsBtns = document.querySelectorAll('.play-song');


function toggleBtn() {
   playBtn.classList.toggle('pause');
   playBtnSong.classList.toggle('pause');
}



const loudIcon = document.querySelector('.loud-icon');

//громкость
document.querySelector('.loud-range').addEventListener('input', () => {
   audio.volume = document.querySelector('.loud-range').value / 100;
   console.log(audio.volume);
   if (audio.volume < 0.01) {
      loudIcon.classList.remove('loud-active');
      loudIcon.classList.add('loud-disable');
   } else {
      loudIcon.classList.add('loud-active');
      loudIcon.classList.remove('loud-disable');
   }
})

loudIcon.addEventListener('click', () => {
   if (loudIcon.classList.contains('loud-active')) {
      audio.volume = 0;
      loudIcon.classList.remove('loud-active');
      loudIcon.classList.add('loud-disable');
   } else {
      loudIcon.classList.add('loud-active');
      loudIcon.classList.remove('loud-disable');
      audio.volume = 0.075;
   }
})