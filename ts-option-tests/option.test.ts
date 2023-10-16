import {Option, Some, None, Optional} from '../ts-option/option';

describe('Option Monad Laws', () => {
    // Helper function
    const double = (x: number) => new Some(x * 2);
    const triple = (x: number) => new Some(x * 3);

    // Left Identity: 
    // return a >>= f ≡ f a
    it('Left Identity', () => {
        const a = 5;
        const optionA = new Some(a);
        expect(optionA.flatMap(double).unwrap()).toEqual(double(a).unwrap());
    });

    // Right Identity: 
    // m >>= return ≡ m
    it('Right Identity', () => {
        const m = new Some(5);
        expect(m.flatMap(x => new Some(x)).unwrap()).toEqual(m.unwrap());
    });

    // Associativity: 
    // (m >>= f) >>= g ≡ m >>= (\x -> f x >>= g)
    it('Associativity', () => {
        const m = new Some(5);
        const left = m.flatMap(double).flatMap(triple);
        const right = m.flatMap(x => double(x).flatMap(triple));
        expect(left.unwrap()).toEqual(right.unwrap());
    });
});

describe('Option Functionality', () => {
    it('fromPredicate should return None if predicate is false', () => {
        expect(Optional.fromPredicate(5, x => x > 10).isNone()).toBe(true);
    });

    it('fromMap should return Some if key exists', () => {
        const map = new Map<string, number>();
        map.set('key', 5);
        const result = Optional.fromMap(map, 'key');
        expect(result.unwrap()).toBe(5);
    });

    it('fromMap should return None if key does not exist', () => {
        const map = new Map<string, number>();
        expect(Optional.fromMap(map, 'missingKey').isNone()).toBe(true);
    });

    it('fromPromise should return Some for resolved promises', async () => {
        const promise = Promise.resolve(5);
        const result = await Optional.fromPromise(promise);
        expect(result.unwrap()).toBe(5);
    });

    it('fromPromise should return None for rejected promises', async () => {
        const promise = Promise.reject(new Error('Promise rejected!'));
        const result = await Optional.fromPromise(promise);
        expect(result.isNone()).toBe(true);
    });
    
    
});

describe('Some Functionality', () => {
    const someValue = new Some(5);

    it('isSome() should return true', () => {
        expect(someValue.isSome()).toBe(true);
    });

    it('isNone() should return false', () => {
        expect(someValue.isNone()).toBe(false);
    });

    it('unwrap() should return the contained value', () => {
        expect(someValue.unwrap()).toBe(5);
    });

    it('unwrapOr() should return the contained value', () => {
        expect(someValue.unwrapOr(10)).toBe(5);
    });

    it('unwrapOrThrow() should return the contained value', () => {
        expect(someValue.unwrapOrThrow(new Error('Error'))).toBe(5);
    });

    it('orElse() should return itself', () => {
        expect(someValue.orElse(new None()).isSome()).toBe(true);
    });

    it('filter() should return itself if predicate is true', () => {
        expect(someValue.filter(x => x > 0).isSome()).toBe(true);
    });

    it('filter() should return None if predicate is false', () => {
        expect(someValue.filter(x => x > 10).isNone()).toBe(true);
    });

    it('map() should apply the function and return the result', () => {
        expect(someValue.map(x => x * 2).unwrap()).toBe(10);
    });

    it('flatMap() should apply the function and return the result', () => {
        expect(someValue.flatMap(x => new Some(x * 2)).unwrap()).toBe(10);
    });

    it('expect() should return the contained value', () => {
        expect(someValue.expect('Error')).toBe(5);
    });
});

describe('None Functionality', () => {
    const noneValue = new None();

    it('isSome() should return false', () => {
        expect(noneValue.isSome()).toBe(false);
    });

    it('isNone() should return true', () => {
        expect(noneValue.isNone()).toBe(true);
    });

    it('unwrap() should throw an error', () => {
        expect(() => noneValue.unwrap()).toThrowError("Called `unwrap()` on a `None` value");
    });

    it('unwrapOr() should return the default value', () => {
        expect(noneValue.unwrapOr(10)).toBe(10);
    });

    it('unwrapOrThrow() should throw the provided error', () => {
        expect(() => noneValue.unwrapOrThrow(new Error('Custom Error'))).toThrowError('Custom Error');
    });

    it('orElse() should return the provided alternative', () => {
        expect(noneValue.orElse(new Some(5)).unwrap()).toBe(5);
    });

    it('filter() should always return None', () => {
        expect(noneValue.filter(() => true).isNone()).toBe(true);
    });

    it('map() should always return None', () => {
        expect(noneValue.map(() => 10).isNone()).toBe(true);
    });

    it('flatMap() should always return None', () => {
        expect(noneValue.flatMap(() => new Some(10)).isNone()).toBe(true);
    });

    it('expect() should throw an error with the provided message', () => {
        expect(() => noneValue.expect('Custom Error')).toThrowError('Custom Error');
    });
});
