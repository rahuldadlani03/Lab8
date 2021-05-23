/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js';

/*
 * The length of history keeps increasing since jest doesn't clean the jsdom
 * after each test runs. That's why the length of history doesn't stay at 2 
 */

describe('empty state', () => {
    test('history length', () => {
        let state = '';
        pushToHistory(state, 0);
        expect(history.length).toBe(2);
    });
    test('history state', () => {
        expect(history.state).toEqual({});
    });
});

describe('settings', () => {
    test('history length', () => {
        pushToHistory('settings', 0);
        expect(history.length).toBe(3);
    });
    test('history state', () => {
        expect(history.state).toEqual({ page: 'settings' });
    });
});

describe('entry', () => {
    test('push entry once', () => {
        history = pushToHistory('entry', 1);
        expect(history.length).toBe(4);
    });
    test('history state', () => {
        expect(history.state).toEqual({ page: `entry1` } );
    });
});
