#!/bin/bash
 
 docker stop next_container || true && docker rm next_container || true
 docker build -t next_container .
 docker run -d -p 3000:3000 --name next_container --restart unless-stopped next_container
