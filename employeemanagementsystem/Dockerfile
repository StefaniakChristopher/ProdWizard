FROM maven:latest

COPY . /app

WORKDIR /app

ENV PORT=8080

EXPOSE 8080

CMD ./mvnw spring-boot:run