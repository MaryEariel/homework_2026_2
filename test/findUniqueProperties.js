'use strict';

QUnit.module("Тестируем функцию findUniqueProperties", function() {
    QUnit.test("Работает правильно для объектов с уникальными свойствами", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2, c: 3 },
            { b: 2, c: 4, d: 5 }
        );

        assert.deepEqual(result, { a: 1, d: 5 }, "Должны быть уникальные свойства из обоих объектов.");
    });

    QUnit.test("Работает правильно для объекты с отсутствующими свойствами", function(assert) {
        const result = findUniqueProperties(
            { x: 10, y: 20 },
            { y: 20, z: 30 }
        );

        assert.deepEqual(result, { x: 10, z: 30 }, "Должны быть уникальные свойства x и z.");
    });

    QUnit.test("Работает правильно для идентичных объектов", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            { a: 1, b: 2 }
        );

        assert.deepEqual(result, {}, "Идентичные объекты должны вернуть пустой объект.");
    });

    QUnit.test("Не считает свойство уникальным, если ключ есть в обоих объектах, но значения разные", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            { a: 999, c: 3 }
        );

        assert.deepEqual(
            result,
            { b: 2, c: 3 },
            "Ключ a присутствует в обоих объектах, значит он не уникален."
        );
    });

    QUnit.test("Работает корректно, если один из объектов пустой", function(assert) {
        assert.deepEqual(
            findUniqueProperties({}, { b: 2 }),
            { b: 2 },
            "Первый объект пустой — вернуть все свойства второго."
        );

        assert.deepEqual(
            findUniqueProperties({ a: 1 }, {}),
            { a: 1 },
            "Второй объект пустой — вернуть все свойства первого."
        );

        assert.deepEqual(
            findUniqueProperties({}, {}),
            {},
            "Оба объекта пустые — вернуть пустой объект."
        );
    });
});