FROM alpine:3.18.5

RUN apk add --no-cache dcron wget rsync ca-certificates postgresql-client logrotate

COPY crontab /etc/cron.d/my-cron-job
COPY aggregations.sh /aggregations.sh
COPY logrotate_conf.sh /logrotate_conf.sh


RUN chmod +x /logrotate_conf.sh
RUN chmod 0644 /etc/cron.d/my-cron-job
RUN chmod +x /aggregations.sh


RUN crontab /etc/cron.d/my-cron-job

RUN touch /var/log/cron.log

CMD /logrotate_conf.sh && crond && tail -f /var/log/cron.log
