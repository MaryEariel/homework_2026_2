'use strict';

/**
 * Возвращает новый объект, содержащий только те свойства,
 * которые присутствуют в одном из двух объектов, но отсутствуют в другом.
 *
 * @param {Object} firstObject - первый объект для сравнения.
 * @param {Object} secondObject - второй объект для сравнения.
 * @returns {Object} новый объект с уникальными свойствами.
 *
 * @example
 * // returns { a: 1, d: 5 }
 * findUniqueProperties({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5 });
 */
const findUniqueProperties = (firstObject, secondObject) => {
    const result = {};

    Object.keys(firstObject).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(secondObject, key)) {
            result[key] = firstObject[key];
        }
    });

    Object.keys(secondObject).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(firstObject, key)) {
            result[key] = secondObject[key];
        }
    });

    return result;
};