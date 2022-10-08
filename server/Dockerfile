FROM rust:bullseye AS builder
WORKDIR /app
ADD . .

# build
RUN cargo build --release