import { faker } from '@faker-js/faker/locale/nl';

export default class TestDataGenerator {

    public static generateBoardName() {
        return faker.animal.cat()
    }

    public static generatePerson() {
       return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        telephone: faker.phone.number('06#########'),
        password: "test",
        address: faker.address.streetAddress(),
        postalCode: faker.address.zipCode(),
        city: faker.address.cityName(),
        country: "Netherlands",
        province: "Utrecht"
       }
    }

}