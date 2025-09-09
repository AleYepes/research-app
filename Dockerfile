FROM golang:1.25.1-alpine AS build
WORKDIR /backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/. .
RUN go build -o main cmd/api/main.go

FROM alpine:3.20.1 AS prod
WORKDIR /
COPY --from=build /backend/main /main
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
