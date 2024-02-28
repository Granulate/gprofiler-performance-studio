#!/bin/sh




cat <<EOF > /etc/logrotate.conf
${LOGROTATE_PATTERN} {
    size ${LOGROTATE_SIZE}
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 root root
}
EOF
