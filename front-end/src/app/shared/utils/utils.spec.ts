import { getImageSrc, getTimestamp, hasSubstring } from './utils';
import * as films from '../../assets/static/films.json';
import { Film } from 'src/app/features/client-portal/models/film.model';

describe('Utils', () => {
    describe('#hasSubstring', () => {
        it("should return a value which is defined", () => {
            expect(hasSubstring('Hello', 'Bye')).toBeDefined();
        });
    
        it("should be able to check whether a string has a substring", () => {
            expect(hasSubstring('Hello, world', 'hel')).toBeTruthy();
            expect(hasSubstring('Hello, world', 'bye')).toBeFalsy();
            expect(hasSubstring('Hello, world', 'Hel')).toBe(true);
            expect(hasSubstring('Hello, world', 'world')).toBe(false);
        });
    });
    
    describe('#getTimestamp', () => {
        it("should return a value which is defined", () => {
            expect(getTimestamp('2021-05-18')).toBeDefined();
        });

        it("should be able to convert date to timestamp", () => {
            expect(getTimestamp('2021-05-18')).toBe(1621296000);
            expect(getTimestamp('2021-05-18 16:30')).toBe(1621344600);
        });
    });

    describe('#getImageSrc', () => {
        let film: Film;

        beforeEach(() => {
            film = (<any>films).default[0];
        });

        it('should return a value which is defined', () => {
            expect(getImageSrc(film)).toBeDefined();
        });

        it('should return image url', () => {
            expect(getImageSrc(film)).toBe('http://localhost:3000/public/Me-Before-You.png');
        });
    });
})