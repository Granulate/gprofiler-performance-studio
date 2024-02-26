FROM alpine:3.18.5

RUN apk add --no-cache dcron wget rsync ca-certificates postgresql-client logrotate sudo

COPY crontab /etc/cron.d/my-cron-job
COPY aggregations.sh /aggregations.sh
COPY logrotate_conf.sh /logrotate_conf.sh


RUN chmod +x /logrotate_conf.sh
RUN chmod 0644 /etc/cron.d/my-cron-job
RUN chmod +x /aggregations.sh


RUN crontab /etc/cron.d/my-cron-job

RUN touch /var/log/cron.log

RUN addgroup -S non_root && adduser -S -G non_root -u 888 non_root && \
    chown -R non_root:non_root /aggregations.sh && \
    chown -R non_root:non_root /logrotate_conf.sh && \
    chown -R non_root:non_root /etc/logrotate.conf && \
    chown -R non_root:non_root /etc/cron.d/my-cron-job && \
    chown -R non_root:non_root /var/log/cron.log

RUN echo "non_root ALL=(ALL) NOPASSWD: $(which crond)" >> /etc/sudoers

USER non_root

CMD /logrotate_conf.sh && sudo crond && tail -f /var/log/cron.log
