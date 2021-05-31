import { Film } from '../../core/models/film.model';
import { environment } from '../../../environments/environment';

export const hasSubstring = (str, substr) => str.toLowerCase().startsWith(substr.toLowerCase());

export const getTimestamp = (value: string): number => new Date(value).getTime() / 1000;

export const getImageSrc = (film: Film) => environment.imageUrl + film.imageSrc;

export const chooseFields = (fields: string, array) => {
  const fieldsArray = fields.split(',');
    return array.map(film => {
      const newObject = {};
      fieldsArray.forEach((field: string) => {
        newObject[field] = typeof film[field] === 'object' ? 
          JSON.parse(JSON.stringify(film[field])) : film[field];
      });
      return newObject;
    });
}
