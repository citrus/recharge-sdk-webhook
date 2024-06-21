# SDK Webhook Bug

This repo is a simple app to demonstrate the `onetime/update` webhook not firing when updating Onetimes via the SDK.

Setup a .env file.

```sh
cp .env.sample .env
```

```txt
# .env
VITE_SHOPIFY_URL=mystore.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx
VITE_RECHARGE_STOREFRONT_TOKEN=xxx
VITE_SHOPIFY_CUSTOMER_TOKEN=xxx
VITE_ONETIME_ID=123
```

Fire up the webhook server, and use either ngrok or localtunnel to proxy requests

```sh
node server.js
lt --port 8080 --subdomain recharge-test
```


Subscribe to the onetime/updated webhook:

```sh
curl --request POST \
  --url https://api.rechargeapps.com/webhooks \
  --header 'Content-Type: application/json' \
  --header 'X-Recharge-Access-Token: xxx' \
  --header 'X-Recharge-Version: 2021-11' \
  --data '{
			"address": "https://recharge-test.loca.lt",
			"included_objects": [],
			"topic": "onetime/updated",
			"version": "2021-11"
		}'
```

Test the server by updating your onetime via Recharge REST API.

```sh
curl --request PUT \
  --url https://api.rechargeapps.com/onetimes/123 \
  --header 'Content-Type: application/json' \
  --header 'X-Recharge-Access-Token: xxx' \
  --header 'X-Recharge-Version: 2021-11' \
  --data '{ "quantity": 2 }'
```

You should now have some json output in your terminal.


```json
> REQUEST RECEIVED < POST
Data:  {
  "onetime": {
    "id": 123,
    "address_id": 123,
    "customer_id": 123,
    "created_at": "2024-06-18T00:34:43+00:00",
    "external_product_id": {
      "ecommerce": "123"
    },
    "external_variant_id": {
      "ecommerce": "123"
    },
    "is_cancelled": false,
    "next_charge_scheduled_at": "2024-09-12",
    "presentment_currency": "USD",
    "price": "19.00",
    "product_title": "Purple T-Shirt",
    "properties": [
      {
        "name": "addon",
        "value": "purple-t-shirt"
      }
    ],
    "quantity": 2,
    "sku": "MERCH-T-MDPR",
    "sku_override": false,
    "type": "onetime",
    "updated_at": "2024-06-21T19:58:12+00:00",
    "variant_title": "Medium"
  }
}
```


Now we're ready to test via the SDK. Fire up the Vite server and open your browser to http://localhost:5173/ and follow the prompts.

```sh
yarn dev
```
