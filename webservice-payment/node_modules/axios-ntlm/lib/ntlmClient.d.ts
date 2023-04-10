import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse };
/**
 * @property username The username of the user you are authenticating as.
 * @property password The password of the user you are authenticating as.
 * @property domain The domain of the user you are authenticating as.
 * @property workstation The workstation in use. Defaults to the current hostname if undefined.
 */
export interface NtlmCredentials {
    readonly username: string;
    readonly password: string;
    readonly domain: string;
    readonly workstation?: string;
}
/**
* @param credentials An NtlmCredentials object containing the username and password
* @param AxiosConfig The Axios config for the instance you wish to create
*
* @returns This function returns an axios instance configured to use the provided credentials
*/
export declare function NtlmClient(credentials: NtlmCredentials, AxiosConfig?: AxiosRequestConfig): AxiosInstance;
//# sourceMappingURL=ntlmClient.d.ts.map