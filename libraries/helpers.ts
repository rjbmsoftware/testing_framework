/**
 * Gives typescript information that the value exists which playwright expected
 * methods do not
 * @param value 
 */
export function assertExists<T>(value: T | null | undefined): asserts value is T {
    if (value == null) throw new Error("Value does not exist");
}
