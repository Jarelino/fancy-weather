/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { Load, Save } from './helper';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    if (!Load('temp')) Save('temp', 'cel');

    this.Render({ town: '', lang: Load('lang') || 'en' });

    view.on('update', this.ImageReload.bind(this));
    view.on('lang', this.Render.bind(this));
    view.on('town-upd', this.TownReload.bind(this));
    view.on('lang-upd', this.LangReload.bind(this));
  }

  async LangReload({ town, lang }) {
    if (!town) {
      town = '';
    }

    if (!lang) {
      lang = 'en';
    }

    const map = town ? { city: `${town}` } : await this.model.getMap();

    const location = await this.model.getLocation(map.city, lang);
    const weather = await this.model.getWeather(map.city, lang);
    weather.list.map((elem) => elem.day = this.model.getWeekDay(elem.dt_txt.slice(0, 11), lang));
    const date = new Date();

    const minutes = date.getMinutes().toString().length - 1 ? date.getMinutes() : `0${date.getMinutes()}`;
    const currentDate = `${this.model.weekDays[`${lang}`][date.getDay()]} ${date.getDate()} ${this.model.month[`${lang}`][date.getMonth() - 1]} ${date.getHours()}:${minutes}`;

    this.view.CreateHTML({
      location: location.results[0],
      weather: weather.list,
      currentDate,
      lang,
    });

    this.view.Events();

    this.view.UpdateMap({
      lat: location.results[0].annotations.OSM.url.split('/')[4],
      lng: location.results[0].annotations.OSM.url.split('/')[5],
    });
  }

  async ImageReload() {
    const image = await this.model.getImage();
    this.view.UpdateImage({ image: image.urls.regular });
  }

  async TownReload({ town, lang }) {
    if (!town) {
      town = '';
    }

    if (!lang) {
      lang = 'en';
    }

    const map = town ? { city: `${town}` } : await this.model.getMap();
    Save('town', map.city);

    const location = await this.model.getLocation(map.city, lang);
    const weather = await this.model.getWeather(map.city, lang);
    weather.list.map((elem) => elem.day = this.model.getWeekDay(elem.dt_txt.slice(0, 11), lang));
    const date = new Date();

    const minutes = date.getMinutes().toString().length - 1 ? date.getMinutes() : `0${date.getMinutes()}`;
    const currentDate = `${this.model.weekDays[`${lang}`][date.getDay()]} ${date.getDate()} ${this.model.month[`${lang}`][date.getMonth() - 1]} ${date.getHours()}:${minutes}`;

    this.view.CreateHTML({
      location: location.results[0],
      weather: weather.list,
      currentDate,
      lang,
    });

    this.view.Events();

    this.view.UpdateMap({
      lat: location.results[0].annotations.OSM.url.split('/')[4],
      lng: location.results[0].annotations.OSM.url.split('/')[5],
    });
  }

  async Render({ town, lang }) {
    if (!town) {
      town = '';
    }

    if (!lang) {
      lang = 'en';
    }

    const map = town ? { city: `${town}` } : await this.model.getMap();
    Save('town', map.city);

    const location = await this.model.getLocation(map.city, lang);
    const image = await this.model.getImage();
    const weather = await this.model.getWeather(map.city, lang);
    weather.list.map((elem) => elem.day = this.model.getWeekDay(elem.dt_txt.slice(0, 11), lang));
    const date = new Date();

    const minutes = date.getMinutes().toString().length - 1 ? date.getMinutes() : `0${date.getMinutes()}`;
    const currentDate = `${this.model.weekDays[`${lang}`][date.getDay()]} ${date.getDate()} ${this.model.month[`${lang}`][date.getMonth() - 1]} ${date.getHours()}:${minutes}`;

    this.view.CreateHTML({
      location: location.results[0],
      weather: weather.list,
      currentDate,
      lang,
    });

    this.view.UpdateImage({ image: image.urls.regular });

    this.view.Events();
    this.view.UpdateMap({
      lat: location.results[0].annotations.OSM.url.split('/')[4],
      lng: location.results[0].annotations.OSM.url.split('/')[5],
    });
  }
}

export default Controller;
