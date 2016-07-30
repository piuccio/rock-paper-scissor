/**
 * Returns true if array contains any of the values in values
 */
export function intersect (array, values) {
    // I'm expecting values to contain uniques
    return values.filter(value => array.indexOf(value) !== -1);
}
