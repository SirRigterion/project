# 1) Сборка фронта
FROM node:alpine AS build

WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

# 2) NGINX отдаёт только статику
FROM nginx:stable-alpine

# Копируем собранную статику в корень nginx
COPY --from=build /app/build /usr/share/nginx/html

# Можно убрать копирование конфига вовсе — nginx по умолчанию отдаёт /usr/share/nginx/html
# или при необходимости скопировать свой упрощённый конфиг для статики:
#
# COPY nginx.static.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
