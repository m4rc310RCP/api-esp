# FROM node:latest as builder

# WORKDIR /app
# COPY package*.json ./
# RUN npm i -g pnpm
# RUN pnpm i

# COPY . .

# RUN pnpm run build 
# #-------
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/dist .
# COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ENTRYPOINT ["nginx", "-g", "daemon off;"]
# EXPOSE 3000

FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i
COPY . .

EXPOSE 3000
CMD ["pnpm", "build"]
CMD ["pnpm", "start"]