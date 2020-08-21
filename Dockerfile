FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8081
RUN mkdir -p /app/
ADD target/addressBook.jar /app/addressBook.jar
ENTRYPOINT ["java", "-jar", "/app/addressBook.jar"]