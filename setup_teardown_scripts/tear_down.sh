#!/bin/bash
# removes the generated volumes

database_volume="testing_framework_db_data"
snipeit_volume="testing_framework_snipe_data"
snipeit_config_volume="testing_framework_snipe_data_config"

volumes=("$database_volume" "$snipeit_volume" "$snipeit_config_volume")

container_software=podman

for volume in "${volumes[@]}"; do
    exists=$($container_software volume ls -f name=$volume --quiet | wc -l)
    if [ $exists -gt 0 ]
    then
        echo "Removing volume..."
        $container_software volume rm $volume
    fi
done
