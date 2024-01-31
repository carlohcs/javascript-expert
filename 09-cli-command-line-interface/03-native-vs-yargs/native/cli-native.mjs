// ❯ node cli-native.mjs --name Carlos --user carlohcs@gmail.com
// console.log(process.argv) ->
// [
//   '/Users/carlohcs/.asdf/installs/nodejs/18.16.0/bin/node',
//   '/Users/carlohcs/Documents/repository/javascript-expert/09-cli-command-line-interface/03-native-vs-yargs/native/cli-native.mjs',
//   '--name',
//   'Carlos',
//   '--age',
//   '31'
// ]

const [nodePath, filePath, ...commands] = process.argv

function parseArguments(commands) {
  const cmd = new Map()
  const commandPrefix = "--"
console.log('commands: ', commands);
  for (const key in commands) {
    const index = parseInt(key)
    const command = commands[key]

    if (!command.includes(commandPrefix)) continue

    cmd.set(command.replace(commandPrefix, ""), commands[index + 1])

    // console.log('command', command);
  }

  return Object.fromEntries(cmd);
}

console.log(parseArguments(commands))
