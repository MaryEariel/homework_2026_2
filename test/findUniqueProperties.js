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

    QUnit.test("Бросает TypeError при неправильных типах аргументов", function(assert) {
        assert.throws(
            () => findUniqueProperties(null, {}),
            TypeError,
            "null как первый аргумент"
        );
        assert.throws(
            () => findUniqueProperties({}, undefined),
            TypeError,
            "undefined как второй аргумент"
        );
        assert.throws(
            () => findUniqueProperties([1, 2], {}),
            TypeError,
            "массив как первый аргумент"
        );
        assert.throws(
            () => findUniqueProperties({}, 'строка'),
            TypeError,
            "строка как второй аргумент"
        );
        assert.throws(
            () => findUniqueProperties(42, {}),
            TypeError,
            "число как первый аргумент"
        );
    });

    QUnit.test("Работает с вложенными объектами и глубоко копирует значения", function(assert) {
        const firstObject = { a: { nested: { value: 1 } }, b: 2 };
        const secondObject = { c: { nested: { value: 3 } } };

        const result = findUniqueProperties(firstObject, secondObject);

        assert.deepEqual(
            result,
            { a: { nested: { value: 1 } }, b: 2, c: { nested: { value: 3 } } },
            "Вложенные объекты должны корректно попасть в результат."
        );

        result.a.nested.value = 999;

        assert.strictEqual(
            firstObject.a.nested.value,
            1,
            "Изменение результата не должно влиять на исходный объект (глубокое копирование)."
        );
    });

    QUnit.test("Работает с полностью разными свойствами у объектов", function(assert) {
        const result = findUniqueProperties(
            { a: 1, b: 2 },
            { c: 3, d: 4 }
        );

        assert.deepEqual(
            result,
            { a: 1, b: 2, c: 3, d: 4 },
            "Если свойства не пересекаются, все они должны попасть в результат."
        );
    });
});
