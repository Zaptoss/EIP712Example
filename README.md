# EIP712 signature
In `App.tsx` you need to change this part: `const response = await fetch("https://...", { method: "" });`. Response from this endpoint must be like:
```json
{
  "data": {
    "attributes": {
      "types": {
        "some_type": [
          {
            "name": "some_type_field1",
            "type": "string"
          },
          {
            "name": "some_type_field2",
            "type": "bytes32"
          }
        ]
      },
      "domain": {
        "name": "Domain name",
        "version": "Version",
        "chainId": "0x1",
        "verifyingContract": "0x12345...", // 20 bytes
        "salt": "0x12345..." // 32 bytes
      },
      "message": {
        "some_type_field1": "value1",
        "some_type_field2": "0x12345..."
      }
    }
  }
}
```

# How to run
You need to have installed node.js.

Use `npm run install && npm run dev` to start. 