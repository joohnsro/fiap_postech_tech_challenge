"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssertionConcern {
    static AssertArgumentNotNull(data, message) {
        if (data == null) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotEmpty(stringValue, message) {
        if (stringValue == null || stringValue.trim().length == 0) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotBiggerThanZero(numberValue, message) {
        if (numberValue <= 0) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotNumber(numberValue, message) {
        if (typeof (numberValue) !== "number") {
            throw new Error(message);
        }
    }
    static AssertArgumentMatches(pattern, stringValue, message) {
        if (!stringValue.match(pattern)) {
            throw new Error(message);
        }
    }
    static AssertArgumentEquals(value1, value2, message) {
        if (value1 === value2) {
            throw new Error(message);
        }
    }
    static AssertArgumentNotEquals(value1, value2, message) {
        if (value1 !== value2) {
            throw new Error(message);
        }
    }
    constructor() { }
    SelfAssertArgumentNotNull(data, message) {
        AssertionConcern.AssertArgumentNotNull(data, message);
    }
    SelfAssertArgumentNotEmpty(stringValue, message) {
        AssertionConcern.AssertArgumentNotEmpty(stringValue, message);
    }
    SelfAssertArgumentNotBiggerThanZero(numberValue, message) {
        AssertionConcern.AssertArgumentNotBiggerThanZero(numberValue, message);
    }
    SelfAssertArgumentNotNumber(numberValue, message) {
        AssertionConcern.AssertArgumentNotNumber(numberValue, message);
    }
    SelfAssertArgumentMatches(pattern, stringValue, message) {
        AssertionConcern.AssertArgumentMatches(pattern, stringValue, message);
    }
    SelfAssertArgumentEquals(stringValue1, stringValue2, message) {
        AssertionConcern.AssertArgumentEquals(stringValue1, stringValue2, message);
    }
    SelfAssertArgumentNotEquals(stringValue1, stringValue2, message) {
        AssertionConcern.AssertArgumentNotEquals(stringValue1, stringValue2, message);
    }
}
exports.default = AssertionConcern;
