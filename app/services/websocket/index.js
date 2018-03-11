import _ from 'lodash'
import * as sessionSelectors from '../session/selectors'
import wsConfig from './config'
import autobind from 'autobind-decorator';

@autobind
export class WSService{
  constructor(endPoint){
    const accessToken = sessionSelectors.get().tokens.access.value
    console.log(`${wsConfig.url}${endPoint}?token=${accessToken}`)
    this.ws =  new WebSocket(`${wsConfig.url}${endPoint}?token=${accessToken}`)//new WebSocket(`${wsConfig.url}${endPoint}?token=${accessToken}`)
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({command:'connect'}))
    }

    this.ws.onerror = (error) =>{
      console.log(error.message)
    }

    this.ws.onclose = this.closeSocket
  }

  send = (data) => {
    console.log("send ",JSON.stringify(data))
    this.ws.onopen = () =>{
      this.ws.send(JSON.stringify(data))
    }
  }

  closeSocket(e){
    console.log("closing socket")
  }
}

export function getWebSocket(endPoint){
  const accessToken = sessionSelectors.get().tokens.access.value
  return new WebSocket(`${wsConfig.url}${endPoint}?token=${accessToken}`)
}
