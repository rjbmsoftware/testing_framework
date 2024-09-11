# podman or docker need to be installed
# run from the project root directory
# removes test framework volumes and recreates from back up

database_volume=testing_framework_db_data
snipeit_volume=testing_framework_snipe_data
snipeit_config_volume=testing_framework_snipe_data_config

container_software=podman
# container_software=docker

${PWD}/setup_teardown_scripts/tear_down.sh

back_up_directory="${PWD}/volume_back_ups"
back_up_volume=/backup
mount_back_up_dir_to_volume="${back_up_directory}:${back_up_volume}"

$container_software run --rm -v testing_framework_db_data:/data \
-v $mount_back_up_dir_to_volume alpine sh -c "cd /data && tar xzf /backup/testing_framework_db_data.tar.gz"

$container_software run --rm -v testing_framework_snipe_data:/data \
-v $mount_back_up_dir_to_volume alpine sh -c "cd /data && tar xzf /backup/testing_framework_snipe_data.tar.gz"

$container_software run --rm -v testing_framework_snipe_data_config:/data \
-v $mount_back_up_dir_to_volume alpine sh -c "cd /data && tar xzf /backup/testing_framework_snipe_data_config.tar.gz"
