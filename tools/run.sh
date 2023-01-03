ENV=$1
RELEASE=$2

set -a
source .env.${ENV}
set +a

cp -rf .env.${ENV} .env
echo "Overided .env.${ENV} folder"

if [[ ${RELEASE} != "release" ]]; then
  ENVFILE=.env.${ENV} yarn start
fi
