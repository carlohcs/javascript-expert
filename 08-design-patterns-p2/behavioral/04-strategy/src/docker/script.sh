# postgres
docker run --name postgres -e POSTGRES_USER=carlohcs -e POSTGRES_PASSWORD="pass0001" -e POSTGRES_DB=strategy -p 5432:5432 -d postgres

docker logs postgres
docker exec -it postgres psql --username carlohcs --dbname strategy

# CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
# SELECT * FROM warriors;

# mongodb

docker run --name mongodb -e MONGO_INITDB_ROOT_USERNAME=carlohcs -e MONGO_INITDB_ROOT_PASSWORD="0001pass" -p 27017:27017 -d mongo:4
docker logs mongodb