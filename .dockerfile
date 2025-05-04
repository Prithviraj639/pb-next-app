FROM node:22

WORKDIR /app

RUN git clone https://github.com/Prithviraj639/pb-next-app.git

RUN npm ci

RUN npx prisma generate

RUN npx prisma db push

