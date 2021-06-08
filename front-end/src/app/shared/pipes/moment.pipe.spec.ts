import * as moment from 'moment';
import { MomentPipe } from './moment.pipe';

describe('MomentPipe', () => {
    moment.locale('ru');

    it('should transform timestamp to string in default format "H:mm"', () => {
        const momentPipe = new MomentPipe();
        expect(momentPipe.transform(1620300295)).toBe('14:24');
        expect(momentPipe.transform(1631162155)).toBe('7:35');
    });

    it('should transform timestamp to string in given format', () => {
        const momentPipe = new MomentPipe();
        expect(momentPipe.transform(1631075755, 'D MMMM')).toBe('8 сентября')
        expect(momentPipe.transform(1631075755, 'DD MM YYYY hh:mm:ss')).toBe('08 09 2021 07:35:55');
    });

    it('should return "Invalid date" if timestamp is not a number', () => {
        const momentPipe = new MomentPipe();
        expect(momentPipe.transform(NaN, 'D MMMM')).toBe('Invalid date');
    });
})