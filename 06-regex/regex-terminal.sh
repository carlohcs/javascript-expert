# from root path
find . -name '*.test.js'

# get all except files and folders from `node_modules`
find . -name '*.test.js' -not -path '*node_modules**'

# Enable a nice listing of items on terminal
# npm i -g ipt 
# https://www.npmjs.com/package/ipt

find . -name '*.test.js' -not -path '*node_modules**' | ipt

# select Multiple files 
find . -name '*.test.js' -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' echo 'ae' {file}

CONTENT="'use strict';"
find . -name '*.test.js' -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\n\n/g' {file}

# on sed
# - O find procura por arquivos na pasta atual (.) cujo nome terminem com a extensão .js (-name '*.js'), excluindo qualquer caminho que tenha a pasta node modules (-not -path '*/node_modules/*')
# - Cada resultado do find (cada caminho de arquivo) é passado para o próximo comando pelo pipe operator (|)
# - O xargs vai armazenar cada caminho de arquivo passado pelo find no identificador {file} (-I {file}).
# - Em seguida, o xargs executa o comando que estiver adiante, nesse caso o sed
# - O sed com a flag -i faz alterações in-place, diretamente no texto dos arquivos, ao invés de só retornar no console "como ficaria", e não gravar no arquivo 
# - As alterações que o sed vai fazer são descritas pelo que está dentro das aspas:
# -- 1 é o endereço, a primeira linha
# -- i é o modo insert, que vai inserir uma linha antes da primeira (se passar 1c vai substituir a 1ª linha, 1a vai adicionar após a 1ª linha etc.)
# -- 'use strict'; é o texto que ele vai inserir
# - O caminho do arquivo que precisa ser alterado pelo sed é passado no final, pelo identificador {file}, que foi criado pelo xargs