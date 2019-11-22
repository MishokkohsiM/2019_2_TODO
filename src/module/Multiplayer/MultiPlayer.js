import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';
import MultiPlayerView from "../../viewes/MultiplayerView/MultiPlayerView";


export default class MultiPlayer {
  constructor() {
    this.socket = new WebSocket('ws://93.171.139.196:780/multiplayer/?name='+user.username );
    this.socket.onopen = ()=>{
      console.log('opened');
    };
    this.socket.onmessage = (msg)=>{
      console.log(JSON.parse(msg.data));
      Object.keys(msg.data).forEach((key)=>{
        this[key](msg.data[key]);
      });
    };
    this.socket.onerror = (err)=> {
        console.log(err);
    };
    // this.animation = new PokerCSSAnimation();
  }
  addPlayers(playerInfo) {
      MultiPlayerView.addPlayer(playerInfo.id, playerInfo.username, playerInfo.score, 'multiplayer__players');
  }
  ready(){
    this.socket.send('ready');
  }
  check() {
    this.socket.send();
  }
}
