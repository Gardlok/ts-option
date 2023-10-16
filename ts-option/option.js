"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Optional = exports.None = exports.Some = void 0;
class Optional {
    static tryCatch(fn) {
        try {
            return new Some(fn());
        }
        catch (_a) {
            return new None();
        }
    }
    static fromNullable(value) {
        return value != null ? new Some(value) : new None();
    }
    static fromArray(arr) {
        return arr.length > 0 ? new Some(arr[0]) : new None();
    }
    static fromPredicate(value, predicate) {
        return predicate(value) ? new Some(value) : new None();
    }
    static fromMap(map, key) {
        return map.has(key) ? new Some(map.get(key)) : new None();
    }
    static fromPromise(promise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield promise;
                return new Some(result);
            }
            catch (_a) {
                return new None();
            }
        });
    }
}
exports.Optional = Optional;
class Some extends Optional {
    constructor(value) {
        super();
        this.value = value;
    }
    isSome() {
        return true;
    }
    isNone() {
        return false;
    }
    unwrap() {
        return this.value;
    }
    unwrapOr(_defaultValue) {
        return this.value;
    }
    unwrapOrThrow(_error) {
        return this.unwrap();
    }
    orElse(_alternative) {
        return this;
    }
    filter(predicate) {
        return predicate(this.unwrap()) ? this : new None();
    }
    map(f) {
        return new Some(f(this.value));
    }
    flatMap(f) {
        return f(this.value);
    }
    expect(msg) {
        return this.value;
    }
}
exports.Some = Some;
class None extends Optional {
    isSome() {
        return false;
    }
    isNone() {
        return true;
    }
    unwrap() {
        throw new Error("Called `unwrap()` on a `None` value");
    }
    unwrapOr(defaultValue) {
        return defaultValue;
    }
    unwrapOrThrow(error) {
        throw error;
    }
    orElse(alternative) {
        return alternative;
    }
    filter(_predicate) {
        return this;
    }
    map(_f) {
        return this;
    }
    flatMap(_f) {
        return this;
    }
    expect(msg) {
        throw new Error(msg);
    }
}
exports.None = None;
