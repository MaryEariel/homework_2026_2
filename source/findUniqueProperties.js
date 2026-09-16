'use strict';

/**
 * Проверяет, является ли значение обычным объектом
 * (не null, не массив, не примитив).
 *
 * @param {*} value - проверяемое значение.
 * @returns {boolean} true, если значение — обычный объект.
 */
const isPlainObject = (value) =>
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value);

/**
 * Возвращает новый объект, содержащий только те свойства,
 * которые присутствуют в одном из двух объектов, но отсутствуют в другом.
 *
 * Значения свойств глубоко копируются, чтобы результат не делил
 * ссылки на вложенные объекты с исходными аргументами.
 *
 * @param {Object} firstObject - первый объект для сравнения.
 * @param {Object} secondObject - второй объект для сравнения.
 * @returns {Object} новый объект с уникальными свойствами.
 * @throws {TypeError} если хотя бы один из аргументов не является обычным объектом.
 *
 * @example
 * // returns { a: 1, d: 5 }
 * findUniqueProperties({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5 });
 */
const findUniqueProperties = (firstObject, secondObject) => {
    if (!isPlainObject(firstObject) || !isPlainObject(secondObject)) {
        throw new TypeError('Оба аргумента должны быть обычными объектами');
    }

    const result = {};

    Object.keys(firstObject).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(secondObject, key)) {
            result[key] = structuredClone(firstObject[key]);
        }
    });

    Object.keys(secondObject).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(firstObject, key)) {
            result[key] = structuredClone(secondObject[key]);
        }
    });

    return result;
};
