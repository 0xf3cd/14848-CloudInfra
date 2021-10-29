FROM node:16.8.0

# Some environment variables here.
# ENV

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
RUN npm -g install serve

# Simply use `serve` to 
EXPOSE 5000
CMD ["serve", "-l", "5000", "-s", "build"]
