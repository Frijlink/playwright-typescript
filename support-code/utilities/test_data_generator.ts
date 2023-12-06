import { faker } from '@faker-js/faker/locale/nl';

export default class TestDataGenerator {

    public static generateBoardName() {
        return faker.animal.cat()
    }

    public static generatePerson() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            telephone: `06${this.getRandomInteger(10000000, 99999999)}`,
            password: "test",
            address: faker.location.streetAddress(),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: "Netherlands",
            province: "Utrecht"
        }
    }

    public static getRandomInteger(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}