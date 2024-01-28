export default class AssertionConcern {

    public static AssertArgumentNotNull(data: any, message: string): void {
        if ( data == null ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotEmpty(stringValue: string, message: string): void {
        if ( stringValue == null || stringValue.trim().length == 0 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotBiggerThanZero(numberValue: number, message: string): void {
        if ( numberValue <= 0 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotNumber(numberValue: number, message: string): void {
        if ( typeof(numberValue) !== "number" ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentMatches(pattern: any, stringValue: string, message: string): void {
        if ( ! stringValue.match(pattern) ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentEquals(value1: any, value2: any, message: string): void {
        if ( value1 === value2 ) {
            throw new Error(message)
        }
    }

    public static AssertArgumentNotEquals(value1: any, value2: any, message: string): void {
        if ( value1 !== value2 ) {
            throw new Error(message)
        }
    }

    protected constructor() {}

    protected SelfAssertArgumentNotNull(data: any, message: string): void {
        AssertionConcern.AssertArgumentNotNull(data, message)
    }

    protected SelfAssertArgumentNotEmpty(stringValue: string, message: string): void {
        AssertionConcern.AssertArgumentNotEmpty(stringValue, message)
    }

    public SelfAssertArgumentNotBiggerThanZero(numberValue: number, message: string): void {
        AssertionConcern.AssertArgumentNotBiggerThanZero(numberValue, message)
    }

    public SelfAssertArgumentNotNumber(numberValue: number, message: string): void {
        AssertionConcern.AssertArgumentNotNumber(numberValue, message)
    }

    public SelfAssertArgumentMatches(pattern: any, stringValue: string, message: string): void {
        AssertionConcern.AssertArgumentMatches(pattern, stringValue, message)
    }

    public SelfAssertArgumentEquals(stringValue1: string, stringValue2: string, message: string): void {
        AssertionConcern.AssertArgumentEquals(stringValue1, stringValue2, message)
    }

    public SelfAssertArgumentNotEquals(stringValue1: string, stringValue2: string, message: string): void {
        AssertionConcern.AssertArgumentNotEquals(stringValue1, stringValue2, message)
    }
}