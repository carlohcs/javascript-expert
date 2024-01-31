#!/usr/bin/env node

// NODE WAY
// ❯ node cli-yargs.mjs --name Carlos --age 31 --power fly
// { name: 'Carlos', age: 31, power: 'fly', id: 1706742707384 }

// SH WAY
// sh ./cli-yargs.mjs createHero --name Flash --age 32 --power Speed
// { name: 'Flash', age: 32, power: 'Speed', id: 1706743482551 }

// it hides the paths from process.argv
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() })
const { argv } = yargs(hideBin(process.argv))
  .command("createHero", "create a hero", (builder) => {
    return builder
      .option("name", {
        alias: "n",
        demandOption: true,
        describe: "hero name",
        type: "string"
      })
      .option("age", {
        alias: "a",
        demandOption: true,
        describe: "hero age",
        type: "number"
      })
      .option("power", {
        alias: "p",
        demandOption: true,
        describe: "hero power",
        type: "string"
      })
      .example(
        "createHero --name Flash --age 31 --power Speed",
        "create a hero"
      )
      .example("createHero --n Flash --a 31 --p Speed", "create a hero")
  })
  .epilog("Copyright 2023 - @carlohcs")

console.log(hero(argv))

// ================== EXAMPLES ================== 
// ❯ node cli-yargs.mjs --help  

// cli-yargs.mjs [command]

// Commands:
//   cli-yargs.mjs createHero  create a hero

// Options:
//   --help     Show help                                                 [boolean]
//   --version  Show version number                                       [boolean]

// Copyright 2023 - @carlohcs

// ================== EXAMPLES ================== 
// ❯ node cli-yargs.mjs createHero --help  

// cli-yargs.mjs createHero

// create a hero

// Options:
//       --help     Show help                                             [boolean]
//       --version  Show version number                                   [boolean]
//   -n, --name     hero name                                   [string] [required]
//   -a, --age      hero age                                    [number] [required]
//   -p, --power    hero power                                  [string] [required]

// Examples:
//   createHero --name Flash --age 31 --power Speed create a hero
//   createHero --n Flash --a 31 --p Speed   create a hero
