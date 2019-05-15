curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ hello(name: \"Andy\") }" }' \
  https://profile-api.andykay.now.sh