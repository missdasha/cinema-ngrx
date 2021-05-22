import { Film } from 'src/app/features/client-portal/models/film.model';
import { environment } from '../../../environments/environment';

export const hasSubstring = (str, substr) => str.toLowerCase().startsWith(substr.toLowerCase());

export const getTimestamp = (value: string): number => new Date(value).getTime() / 1000;

export const getImageSrc = (film: Film) => environment.imageUrl + film.imageSrc;
