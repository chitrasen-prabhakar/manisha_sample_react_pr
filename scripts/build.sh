#!/bin/bash  

# check if node is installed
if which node > /dev/null
then
    # Check if node version 12.18.0 is installed
    read version _ <<< $(node -v)

    if [[ $version != "v12.18.0" ]]; then
        echo "Node v12.18.0 is required, please install node version v12.18.0. Current version: $version"
        exit 1
    fi

    # Check if yarn 1.22.4 is installed
    read yarnversion _ <<< $(yarn -v)

    if [[ $yarnversion != "1.22.4" ]]; then
        echo "Yarn 1.22.4 is required, please install yarn version 1.22.4 and retry. Current version: $yarnversion"
        exit 1
    fi

    # Check if docker daemon is ready
    docker_state=$(docker info >/dev/null 2>&1)
    if [[ $? -ne 0 ]]; then
        echo "Docker does not seem to be running, run it first and retry"
        exit 1
    fi

    # Execute
    #Install all packages
    yarn install

    # Build Project
    npm run build

    # Build Docker image
    sudo docker build . -f Dockerfile.staging -t ops-openresty

    # Create docker container from above image
    sudo docker run -d -p 4000:80 ops-openresty:latest
else
    echo "Node is required. Please install node v12.18.0 and retry."
fi