# ตั้งค่า node version และ image ของ node
FROM node:14-alpine

# ตั้งค่า working directory ของ app
WORKDIR /app

# คัดลอก package.json และ package-lock.json เข้าสู่ container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# copy ไฟล์ทั้งหมดของโปรเจ็กต์เข้า container
COPY . .

EXPOSE 8081
# รัน react app
CMD [ "npm", "run", "dev"]