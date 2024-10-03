# Use the latest stable Gradle version with JDK 17
FROM gradle:8.9.0-jdk17 AS build

WORKDIR /app

# Copy build configuration and source code
COPY build.gradle settings.gradle ./
COPY src ./src

# Build the application, skipping tests for faster builds
RUN gradle build -x test

# Use the latest stable OpenJDK 17 slim image for running the application
FROM openjdk:17-slim

# Copy the built JAR from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the default Spring Boot port
EXPOSE 8080
