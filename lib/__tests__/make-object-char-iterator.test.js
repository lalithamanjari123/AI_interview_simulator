import { makeObjectCharIterator } from "../../lib/make-object-char-iterator";
test("Simple object", function () {
    var start = { a: "" };
    var end = { a: "abc" };
    var iterator = makeObjectCharIterator(start, end);
    expect(iterator.next().value).toEqual({ a: "a" });
    expect(iterator.next().value).toEqual({ a: "ab" });
    expect(iterator.next().value).toEqual({ a: "abc" });
    expect(iterator.next().value).toEqual(undefined);
});
test("Nested object", function () {
    var start = { a: { b: "" } };
    var end = { a: { b: "abc" } };
    var iterator = makeObjectCharIterator(start, end);
    expect(iterator.next().value).toEqual({ a: { b: "a" } });
    expect(iterator.next().value).toEqual({ a: { b: "ab" } });
    expect(iterator.next().value).toEqual({ a: { b: "abc" } });
    expect(iterator.next().value).toEqual(undefined);
});
