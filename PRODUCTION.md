# Production Deployment Guide

This guide explains how to deploy your Novine application in production mode with proper volume configuration for media storage.

## Prerequisites

- Docker and Docker Compose installed on your server
- Git to clone the repository

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd novine
```

### 2. Configure Environment Variables

Create or update your `.env` file with production values:

```bash
# Required environment variables
PAYLOAD_SECRET=your_strong_secret_here
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
CRON_SECRET=your_strong_secret_here
PREVIEW_SECRET=your_strong_secret_here

PROJECT_NAME=novine
PROJECT_BASE_URL=your-domain.com

POSTGRES_DB=novine
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_strong_password_here
POSTGRES_HOST=postgres-database
POSTGRES_PORT=5432
DATABASE_URI="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"
```

### 3. Build and Start the Application

```bash
# Build the Docker image
docker build -t novine:latest -f Dockerfile.production .

# Run the application with Docker Compose
docker-compose -f docker-compose.production.yml up -d
```

### 4. Verify the Deployment

Check if the containers are running:

```bash
docker-compose -f docker-compose.production.yml ps
```

Access your application at https://your-domain.com

## Media Storage

The media files uploaded to your application are stored in a Docker volume named `novine-media-storage`. This ensures that:

1. The files persist even if the container is restarted or rebuilt
2. The application has the proper permissions to write to this directory
3. No permission errors will occur when uploading media files

## Maintenance

### Viewing logs

```bash
docker-compose -f docker-compose.production.yml logs -f
```

### Updating the application

```bash
# Pull the latest code
git pull

# Rebuild the Docker image
docker build -t novine:latest -f Dockerfile.production .

# Restart the services
docker-compose -f docker-compose.production.yml up -d
```

### Backup

To backup the database and media files:

```bash
# Backup the database
docker exec novine-postgres pg_dump -U postgres novine > backup_$(date +%Y%m%d).sql

# Backup media files (you'll need to determine where Docker stores volumes on your system)
# On most Linux systems:
sudo cp -r /var/lib/docker/volumes/novine-media-storage/_data/ ./media_backup_$(date +%Y%m%d)
```