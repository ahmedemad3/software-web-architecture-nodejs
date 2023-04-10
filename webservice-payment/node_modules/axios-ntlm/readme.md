# Axios-NTLM

This is a helper library for NTLM Authentication using the [Axios](https://github.com/axios/axios) HTTP library on Node. It attaches interceptors to an axios instance to authenticate using NTLM for any resources that offer it.

## Examples

### Basic example

This example will create you a brand new axios instance you can utilise the same as any other axios instance

```ts

import { NtlmClient } from 'axios-ntlm';

(async () => {

    let credentials: NtlmCredentials = {
        username: 'username',
        password: "password",
        domain: 'domain'
    }

    let client = NtlmClient(credentials)

    try {
        let resp = await client({
            url: 'https://protected.site.example.com',
            method: 'get'
        });
        console.log(resp.data);
    }
    catch (err) {
        console.log(err)
        console.log("Failed")
    }

})()

```
### With a custom Axios config

This shows how to pass in an axios config in the same way that you would when setting up any other axios instance. 

Note: If doing this, be aware that http(s)Agents need to be attached to keep the connection alive. If there are none attached already, they will be added. If you are providing your own then you will need to set this up.

```ts
import { AxiosRequestConfig } from 'axios';
import { NtlmClient, NtlmCredentials } from 'axios-ntlm';

(async () => {
    
    let credentials: NtlmCredentials = {
        username: 'username',
        password: "password",
        domain: 'domain'
    }

    let config: AxiosRequestConfig = {
        baseURL: 'https://protected.site.example.com',
        method: 'get'
    }

    let client = NtlmClient(credentials, config)

    try {
        let resp = await client.get('/api/123')
        console.log(resp);
    }
    catch (err) {
        console.log(err)
        console.log("Failed")
    }

})()

```