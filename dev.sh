#!/bin/sh

sudo docker-compose -f docker/docker-dev.yml --project-directory . up --build
