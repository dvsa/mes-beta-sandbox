import {Configuration } from "../api";


export function getConfig() : Configuration {
  //TODO - Pull in values from some sort of env file
  return new Configuration({
    apiKeys: { 'apikey': 'special-key'},
    username: '',
    password: '',
    accessToken: '',
    basePath: '',
    withCredentials: false
  });
}
