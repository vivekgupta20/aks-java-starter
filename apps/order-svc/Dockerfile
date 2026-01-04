
# build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml ./
RUN mvn -q -e -ntp -DskipTests=true dependency:go-offline
COPY src ./src
RUN mvn -q -e -ntp -DskipTests=true package  # this creates target/app.jar

# run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /src/target/app.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

