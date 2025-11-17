
set -e  # Para em caso de erro

npm install

npm install --prefix frontend

npm run build --prefix frontend

npx prisma generate

npx prisma migrate deploy

echo "Finish"

