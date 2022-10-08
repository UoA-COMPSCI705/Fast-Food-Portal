FROM rust:bullseye AS builder
WORKDIR /app
ADD . .

# build
RUN cargo build --release

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /app/target/release/foodportal /usr/bin/
CMD ["foodportal"]