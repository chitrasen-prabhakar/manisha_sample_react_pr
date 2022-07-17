
# build docker
docker build -f Dockerfile.dev -t fc/ops_panel . 

CONTAINER_NAME="container_ops_panel"
OLD="$(docker ps --all --quiet --filter=name="$CONTAINER_NAME")"
if [ -n "$OLD" ]; then
  docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME
fi

docker run -d -p 80:80 --name container_ops_panel fc/ops_panel 