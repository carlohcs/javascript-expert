const { evaluateRegex } = require('./util');

class Person {
  constructor([
    name,
    nacionality,
    civilStatus,
    cpf,
    street,
    number,
    district,
    city
  ]) {
    const formatFirstLetter = (prop) => {
      const firstLetter = evaluateRegex(/^(\w{1})([a-zA-Z]+)$/g);

      return prop.replace(firstLetter, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      });
    }

    const removeNotNumber = (prop) => {
      return prop.replace(/\D/g, '')
    }

    const onlyStreet = (prop) => {
      // find for ' a ' and get all content after it
      return prop.match(/(?<=\sa\s).*$/).join('')
    }

    const cleanDistrict = (prop) => {
      return prop.match(/(?<=\s).*$/).join('')
    }

    const cleanCity = (prop) => {
      return prop.replace(/\.$/, '')
    }

    // (\w+),
    // this.$1 = $1
    this.name = name
    this.nacionality = formatFirstLetter(nacionality)
    this.civilStatus = formatFirstLetter(civilStatus)
    this.cpf = removeNotNumber(cpf)
    this.street = onlyStreet(street)
    this.number = number
    this.district = cleanDistrict(district)
    this.city = cleanCity(city)
  }
}

module.exports = Person
