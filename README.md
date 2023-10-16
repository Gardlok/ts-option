# ts-option
A robust and expressive way to handle optional values in TypeScript, inspired by Rust's Option type.
 
  * Type-Safe: Leverage TypeScript's type system to ensure safety.
  * Expressive: Clearly express the intent of your code with Some and None.
  * Comprehensive: Includes methods like unwrap, unwrapOr, map, flatMap, filter, isSome, isNone, expect, and others including various constructors modeled for the TypeScript environment.
  * Functional: Chain operations on values that may or may not exist and handle null values as they come. Abides to the Monad laws of identity and associativity.


## Example:

```
import { Some, None, Optional } from "ts-option";

// Create an Option
const value = new Some(5);
const noValue = new None();

// Use map to transform the value
const squared = value.map(x => x * x);

// Use unwrapOr to provide a default
const result = noValue.unwrapOr(10);  // result will be 10

// Chain operations with flatMap
const chained = value.flatMap(x => x > 3 ? new Some(x + 1) : new None());

// Safely handle potential null or undefined values
const fromNullable = Optional.fromNullable(someNullableValue);
```

## API

`Some<T>`
Represents an optional value that exists.

`None`
Represents an absence of a value.

`Optional`
Abstract class providing static methods for creating and working with Option types.
Contributing

### Contributions and/or feedback are welcome! 
