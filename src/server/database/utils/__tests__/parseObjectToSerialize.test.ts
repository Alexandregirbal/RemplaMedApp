import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { parseObjectToSerialize } from "../parseObjectToSerialize";

describe("parseObjectToSerialize", () => {
    it("should parse a simple object", () => {
        const id = new Types.ObjectId();
        const createdAt = faker.date.anytime();
        const updatedAt = faker.date.anytime();

        const simpleObject = {
            _id: id,
            createdAt,
            updatedAt,
        };
        const serialaziableObject = {
            _id: id.toString(),
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
        };

        expect(parseObjectToSerialize(simpleObject)).toEqual(
            serialaziableObject
        );
    });

    it("should parse a nested object", () => {
        const id = new Types.ObjectId();
        const createdAt = faker.date.anytime();
        const updatedAt = faker.date.anytime();

        const nestedObject = {
            _id: id,
            createdAt,
            updatedAt,
            nested: {
                _id: id,
                createdAt,
                updatedAt,
            },
        };
        const serialaziableObject = {
            _id: id.toString(),
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
            nested: {
                _id: id.toString(),
                createdAt: createdAt.toISOString(),
                updatedAt: updatedAt.toISOString(),
            },
        };

        expect(parseObjectToSerialize(nestedObject)).toEqual(
            serialaziableObject
        );
    });

    it("should parse an object with many fields", () => {
        const id = new Types.ObjectId();
        const createdAt = faker.date.anytime();
        const updatedAt = faker.date.anytime();
        const name = faker.person.firstName();
        const age = faker.number.int();

        const manyFieldsObject = {
            _id: id,
            createdAt,
            updatedAt,
            name,
            age,
            nested: {
                _id: id,
                createdAt,
                updatedAt,
                name,
                age,
            },
        };
        const serialaziableObject = {
            _id: id.toString(),
            createdAt: createdAt.toISOString(),
            updatedAt: updatedAt.toISOString(),
            name,
            age,
            nested: {
                _id: id.toString(),
                createdAt: createdAt.toISOString(),
                updatedAt: updatedAt.toISOString(),
                name,
                age,
            },
        };

        expect(parseObjectToSerialize(manyFieldsObject)).toEqual(
            serialaziableObject
        );
    });
});
