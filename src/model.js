/* eslint-disable class-methods-use-this */
class Model {
  constructor() {
    this.weekDays = {
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      be: ['Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Субота', 'Нядзеля'],
    };

    this.month = {
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      be: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
    };
  }

  getWeekDay(date, lang = 'en') {
    const monthIndexes = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];

    const dayIndex = date.slice(8, 11);
    const monthIndex = monthIndexes[date.slice(5, 7)[0] !== '0' ? date.slice(5, 7) - 1 : date.slice(6, 7) - 1];
    const yearIndex = (6 + date.slice(2, 4) + Math.floor(date.slice(2, 4) / 4)) % 7;
    return this.weekDays[`${lang}`][((+dayIndex + monthIndex + yearIndex) % 7)];
  }

  async getImage() {
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=ebcfbb768413a5cb9a59d5ca8d306206da060493b6b0a5a811bb3c5792f08b38';

    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }

  async getWeather(city, lang = 'en') {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&units=metric&APPID=6003d99dd729f938fb1ae682a5c935e5`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }

  async getMap() {
    return fetch('https://ipinfo.io/json?token=741035a439db1b')
      .then((res) => res.json())
      .then((data) => data);
  }

  async getLocation(city, lang = 'en') {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=7e137342f87443fe84785827a1c6b056&language=${lang}`;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
}

export default Model;
