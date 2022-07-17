# Install dependencies only when needed

FROM openresty/openresty:alpine-fat

RUN apk add --no-cache nodejs npm

RUN mkdir /app/
RUN chmod -R 777 /app
WORKDIR /app/

COPY package.json .
COPY package-lock.json .
RUN npm install 
# COPY out .
COPY . .
RUN npm run build
EXPOSE 3000


RUN  luarocks install inspect
COPY nginx/production/nginx.conf /usr/local/openresty/nginx/conf
COPY nginx/mime.types /etc/nginx
RUN chmod -R 755 /app
COPY nginx/lib /home/lualib


COPY scripts/nginxstart.sh .
RUN chmod +x nginxstart.sh
ENTRYPOINT ["/bin/bash", "nginxstart.sh"]

