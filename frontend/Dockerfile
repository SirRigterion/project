# 1) Сборка фронта
FROM node:alpine AS build
WORKDIR /app
COPY package.json package.json 
RUN npm install
COPY . .
RUN npm run build

# 2) NGINX
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
