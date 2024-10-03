FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .
RUN npm run kafka:create-topics
RUN npm run prisma:generate
RUN npm run build
# Start the application
CMD ["npm", "run", "start:dist"]

EXPOSE 5000
