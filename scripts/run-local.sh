directory=$(pwd)
if [[ $directory == *"/scripts" ]]; then
  cd ..
fi

docker-compose -f docker/local/docker-compose.yml up --build --abort-on-container-exit