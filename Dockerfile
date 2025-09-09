FROM golang:1.25.1-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main cmd/api/main.go

FROM alpine:3.20.1 AS prod
WORKDIR /app
COPY --from=build /app/main /app/main
EXPOSE ${PORT}
CMD ["./main"]


FROM node:20 AS frontend_builder
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

FROM nginx:1.27-alpine AS frontend
COPY --from=frontend_builder /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
