# jq is a command-line JSON processor
# how to install it?
# https://stedolan.github.io/jq/download/
#  brew install jq

FOLDER_AMOUNT=4

for index in $(seq 1 $FOLDER_AMOUNT); do
# 1,2 -> bash01, bash02
# 3,4 -> shell01, shell02
folder=$([ $index -ge 3 ] && echo "bash-0$index" || echo "shell-0$index")
  mkdir -p $folder
  cd $(pwd)/$folder

  npm init -y --scope @carlohcs --silent > /dev/null
  cat package.json | jq '{n: .name, v: .version}'
  cd ..
done

rm -rf bash* shell*