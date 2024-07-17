#!/bin/bash

# How to run:
# ./run-local-payment-webhook.sh <payment_id>
# Example:
# ./run-local-payment-webhook.sh tr_G8xSkDwwce

echo "Payment id : $1"

curl --location 'http://localhost:3000/api/payment/webhook' \
--header 'Content-Type: application/json' \
--data "{ \"id\": \"$1\" }"