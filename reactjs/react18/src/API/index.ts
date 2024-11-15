import axios from 'axios'
import configs from 'configs'
import { AuthenticateParams } from 'constants/enum'
import { IRequestHeader, IServerError } from 'interfaces/authentication'

export const api = axios.create({
  baseURL: configs.apiBaseUrl
})

export function auth(): IRequestHeader {
  if (typeof window === 'undefined') {
    return {}
  }

  const headers = { Authorization: '' }
  const accessToken = localStorage.getItem(AuthenticateParams.ACCESS_TOKEN) || ''
  headers.Authorization = `Bearer ${accessToken}`

  return headers
}

export const errorHandler = (error: IServerError): void => {
  switch (error?.statusCode) {
    case 401:
      redirectLogin()
      break
  }
}

function redirectLogin(): void {
  localStorage.setItem(AuthenticateParams.ACCESS_TOKEN, '')
  if (window) {
    //TODO: enable it when integrate login feature
    //window.location.href = routes.login.value
  }
}
