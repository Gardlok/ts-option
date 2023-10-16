

type Option<T> = Some<T> | None;

abstract class Optional<T> {
    abstract isSome(): this is Some<T>;
    abstract isNone(): this is None;
    abstract unwrap(): T;
    abstract unwrapOr(defaultValue: T): T;
    abstract unwrapOrThrow(error: Error): T;
    abstract orElse(alternative: Option<T>): Option<T>;
    abstract filter(predicate: (value: T) => boolean): Option<T>;
    abstract map<U>(f: (value: T) => U): Option<U>;
    abstract flatMap<U>(f: (value: T) => Option<U>): Option<U>;
    abstract expect(msg: string): T;

    static tryCatch<T>(fn: () => T): Option<T> {
        try {
            return new Some(fn());
        } catch {
            return new None();
        }
    }

    static fromNullable<T>(value: T | null | undefined): Option<T> {
        return value != null ? new Some(value) : new None();
    }

    static fromArray<T>(arr: T[]): Option<T> {
        return arr.length > 0 ? new Some(arr[0]) : new None();
    }

    static fromPredicate<T>(value: T, predicate: (value: T) => boolean): Option<T> {
        return predicate(value) ? new Some(value) : new None();
    }
    
    static fromMap<K, V>(map: Map<K, V>, key: K): Option<V> {
        return map.has(key) ? new Some(map.get(key)!) : new None();
    }
    
    static async fromPromise<T>(promise: Promise<T>): Promise<Option<T>> {
        try {
            const result = await promise;
            return new Some(result);
        } catch {
            return new None();
        }
    }
    
}

class Some<T> extends Optional<T> {
    constructor(private value: T) {
        super();
    }

    isSome(): this is Some<T> {
        return true;
    }

    isNone(): this is None {
        return false;
    }

    unwrap(): T {
        return this.value;
    }

    unwrapOr(_defaultValue: T): T {
        return this.value;
    }

    unwrapOrThrow(_error: Error): T {
        return this.unwrap();
    }

    orElse(_alternative: Option<T>): Option<T> {
        return this;
    }

    filter(predicate: (value: T) => boolean): Option<T> {
        return predicate(this.unwrap()) ? this : new None();
    }

    map<U>(f: (value: T) => U): Option<U> {
        return new Some(f(this.value));
    }

    flatMap<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.value);
    }

    expect(msg: string): T {
        return this.value;
    }
}

class None extends Optional<never> {
    isSome(): this is Some<never> {
        return false;
    }

    isNone(): this is None {
        return true;
    }

    unwrap(): never {
        throw new Error("Called `unwrap()` on a `None` value");
    }

    unwrapOr<T>(defaultValue: T): T {
        return defaultValue;
    }

    unwrapOrThrow(error: Error): never {
        throw error;
    }

    orElse<T>(alternative: Option<T>): Option<T> {
        return alternative;
    }

    filter<T>(_predicate: (value: never) => boolean): Option<T> {
        return this;
    }

    map<U>(_f: (value: never) => U): Option<U> {
        return this;
    }

    flatMap<U>(_f: (value: never) => Option<U>): Option<U> {
        return this;
    }

    expect(msg: string): never {
        throw new Error(msg);
    }
}

export { Option, Some, None, Optional };