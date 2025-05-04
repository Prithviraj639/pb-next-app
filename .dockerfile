FROM node:22

WORKDIR /app/pb-next-app

RUN git clone https://github.com/Prithviraj639/pb-next-app.git

RUN npm install

RUN npx prisma generate

RUN npx prisma db push

