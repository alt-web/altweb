# Alt Web

![Screenshot](public/screenshot-1.webp)
Our home page, which we plan to make universal in the future.

![Uptime](https://status.altweb.tech/api/v1/endpoints/_alt-web/uptimes/7d/badge.svg)

## Development server

```bash
podman-compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build project:

```bash
podman build -f docker/prod.Dockerfile .
```

## Podman

In our examples, we use podman, but you can safely replace it with docker.
However, you may need to add `sudo` before the command.
