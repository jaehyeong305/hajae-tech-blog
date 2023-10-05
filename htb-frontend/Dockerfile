# Build Stage
FROM node:20.5.1 AS build

WORKDIR ./
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:1.20.2

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# 빌드된 Next.js 어플리케이션 파일을 Nginx 서버의 html 폴더로 복사
COPY --from=build ./.next /usr/share/nginx/html/_next

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
