cd ./dist

docker build -t chrisstefaniak/prodwizard-frontend:latest .

docker push chrisstefaniak/prodwizard-frontend:latest