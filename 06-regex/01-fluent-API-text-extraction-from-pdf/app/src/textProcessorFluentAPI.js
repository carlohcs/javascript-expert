// Follows the idea of Builder pattern -> 
// Helps to create object
// "I don't have all properties now"
// object.setName('foo') -> return this
// on the end -> object.build()
// Here it's about process, and Builder it's about object construction
class TextProcessorFluentAPI {
  // private property
  // don't work on JS navigator, only nodejs
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= take all data starting AFTER this group
    // [contratante|contratada] one or other, (and we have a flag to be case insensitive)
    //:\s{1} find one literal character from : with space
    // all above inside a () to say "we will tak ahead"

    // (?!s) negative look around, ignores other different ocurrences
    // .*\n take anything inclusing \n
    // .*? non greet, ? stop on the first ocurrence - prevents loop

    // $ informs that the search ends on the end of line
    // g -> global
    // m -> multiline
    // i -> insensitive

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
    const onlyPerson = this.#content.match(matchPerson)

    // console.log('onlyPerson', onlyPerson)
    this.#content = onlyPerson;

    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI