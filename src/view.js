/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import {
  EventEmitter, Save, Load, C2F, F2C,
} from './helper';

class View extends EventEmitter {
  constructor() {
    super();
  }

  Events() {
    Array.from(document.getElementsByClassName('temp-change')).forEach((elem) => elem.addEventListener('click', this.TempChange.bind(this)));

    document.getElementById('lang').addEventListener('change', this.LangChange.bind(this));

    document.getElementById('upd').addEventListener('click', this.ChangeImage.bind(this));

    document.getElementById('btn-search').addEventListener('click', this.Search.bind(this));
  }

  Search() {
    Save('town', document.getElementById('town-input').value);
    this.UpdatePage({ town: document.getElementById('town-input').value });
  }

  UpdatePage({ town }) {
    this.emit('town-upd', { town, lang: Load('lang') });
  }


  ChangeImage() {
    this.emit('update', {});
  }

  LangChange(event) {
    Save('lang', event.currentTarget.value);
    this.emit('lang-upd', { town: Load('town'), lang: event.currentTarget.value });
  }

  TempChange(event) {
    document.querySelector('.state-menu__units_active').classList.remove('state-menu__units_active');
    event.target.classList.add('state-menu__units_active');

    if (Load('temp') === 'cel' && event.target.innerHTML !== '℃') {
      Array.from(document.getElementsByClassName('temp')).forEach((elem) => {
        elem.innerHTML = `${C2F(elem.innerHTML.slice(0, elem.innerHTML.length - 1))}°`;
        Save('temp', 'far');
      });
    } else if (Load('temp') === 'far' && event.target.innerHTML !== '℉') {
      Array.from(document.getElementsByClassName('temp')).forEach((elem) => {
        elem.innerHTML = `${F2C(elem.innerHTML.slice(0, elem.innerHTML.length - 1))}°`;
        Save('temp', 'cel');
      });
    }
  }

  UpdateMap({ lat, lng }) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFyZWwiLCJhIjoiY2s0NnU3aW9pMG0zYzNmcXU0N2pocmhxeiJ9.TSTbGi1CSWFR_cJMXyHXng';
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 11,
    });
  }


  UpdateImage({ image }) {
    document.getElementsByTagName('body')[0].style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('${image}')`;
  }


  CreateHTML({
    location, weather, currentDate, lang,
  }) {
    const html = `
        <nav id="menu">
            <div class="state-menu">
                <button id = "upd" class="state-menu__update"><img src = './assets/img/Vector.png' /></button>
                <div class="state-menu__lang">
                    <select name="" id="lang" class="state-menu__lang_select">
                        <option value="en" ${lang === 'en' ? 'selected' : ''}>en</option>
                        <option value="ru" ${lang === 'ru' ? 'selected' : ''}>ru</option>
                        <option value="be" ${lang === 'be' ? 'selected' : ''}>be</option>
                    </select>
                </div>
                <div class="state-menu__units">
                    <button class="temp-change state-menu__units_cel ${Load('temp') === 'cel' ? 'state-menu__units_active' : ''}">℃</button>
                    <button class="temp-change state-menu__units_far ${Load('temp') === 'far' ? 'state-menu__units_active' : ''}">℉</button>
                </div>
            </div>
            <div class="search">
                <input type="text" id = 'town-input' x-webkit-speech="x-webkit-speech">
                <button id = 'btn-search'>${lang === 'ru' ? 'Поиск' : lang === 'en' ? 'Search' : 'Пошук'}</button>
            </div>
        </nav>
        <main>
            <setion class="weather">
                <div class="weather__main-info">
                    <div class="weather__main-info_location">
                        <p>${location.formatted}</p>
                    </div>
                    <div class="weather__main-info_date">
                        <p>${currentDate}</p>
                    </div>
                    <div class="weather__main-info_today">
                        <div class="weather__main-info_today_temp">
                            <p class = "temp">${Load('temp') === 'cel' ? Math.round(weather[8].main.temp) : C2F(weather[8].main.temp)}°</p>
                            <div>
                                <img class = "weather__main-info_today_temp_img" src = "http://openweathermap.org/img/wn/${weather[0].weather[0].icon}@2x.png">
                            </div>
                        </div>
                        <div class="weather__main-info_today_description">
                            <p>${weather[0].weather[0].description[0].toUpperCase()}${weather[0].weather[0].description.slice(1)}</p>
                            <p>${lang === 'en' ? 'Feels like' : lang === 'ru' ? 'Ощущается' : 'Адчуваецца'}: <span class = "temp">${Math.round(weather[0].main.feels_like)}°</span></p>
                            <p>${lang === 'en' ? 'Wind' : lang === 'ru' ? 'Ветер' : 'Вецер'}: ${Math.round(weather[0].wind.speed)} m/s</p> 
                            <p>${lang === 'en' ? 'Humidity' : lang === 'ru' ? 'Влажность' : 'Вільготнасць'}: ${weather[0].main.humidity}%</p>
                        </div>
                    </div>
                </div>

                <div class="weather__main-info_days">
                    <div class="weather__main-info_days_day">
                        <p>${weather[8].day}</p>
                        <div class="weather__main-info_days_day_temp">
                        <p class = "temp">${Load('temp') === 'cel' ? Math.round(weather[8].main.temp) : C2F(weather[8].main.temp)}°</p>
                        <div>
                            <img src = "http://openweathermap.org/img/wn/${weather[8].weather[0].icon}@2x.png">
                        </div>
                    </div>
                    </div>
                    <div class="weather__main-info_days_day">
                        <p>${weather[16].day}</p>
                        <div class="weather__main-info_days_day_temp">
                        <p class = "temp">${Load('temp') === 'cel' ? Math.round(weather[16].main.temp) : C2F(weather[16].main.temp)}°</p>
                        <div>
                            <img src = "http://openweathermap.org/img/wn/${weather[16].weather[0].icon}@2x.png">
                        </div>
                    </div>
                    </div>
                    <div class="weather__main-info_days_day">
                        <p>${weather[24].day}</p>
                        <div class="weather__main-info_days_day_temp">
                            <p class = "temp">${Load('temp') === 'cel' ? Math.round(weather[24].main.temp) : C2F(weather[24].main.temp)}°</p>
                            <div>
                                <img src = "http://openweathermap.org/img/wn/${weather[24].weather[0].icon}@2x.png">
                            </div>
                        </div>
                    </div>
                </div>
            </setion>
            <aside class="map">
                <div id = "map" class="map__div"></div>
                <div class="map__location-data">
                    <p id="latitude">${lang === 'en' ? 'Latitude' : lang === 'ru' ? 'Широта' : 'Шырата'}: ${location.annotations.DMS.lat.split("'")[0]}</p>
                    <p id="longitude">${lang === 'en' ? 'Latitude' : lang === 'ru' ? 'Долгота' : 'Даўгата'}: ${location.annotations.DMS.lng.split("'")[0]}</p>
                </div>
            </aside>
        </main>
            `;

    document.getElementById('app').innerHTML = html;
  }
}

export default View;
