#!/bin/bash

postgraphile \
  --connection postgres://localhost:5432/bd_abit \
  --schema nucleo \
  --host localhost \
  --port 8005 \
  --secret 123456 \
  --default-role root \
  --cors
#  --token sijp.jwt \
#  --host localhost \
#  --host 192.168.56.101 \
