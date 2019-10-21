import BaseView from '../BaseView/BaseView.js';import PokerUserPanel from "../../PokerUserPanel/PokerUserPanel.js";import {game} from "../../../module/PokerGamePlay.js";import {PokerBotPanel} from "../../PokerBotPanel/PokerBotPanel.js";export default class OfflineGameView extends BaseView {  constructor(element) {    super(element);    this.card = null;    this.game = new game();  }  render() {    this.el.innerHTML = '';    const botPanel = new PokerBotPanel();    botPanel.updateContext({      score: window.sessionStorage.botScore,      bet: window.sessionStorage.botBet    });    this.el.innerHTML += botPanel.render();    const canvas = document.createElement('canvas');    canvas.className = 'canvas';    canvas.id = 'canvas';    this.el.appendChild(canvas);    canvas.width = 1024;    canvas.height = 768;    this.el.className = 'sect';    // canvas.getContext('2d');    const buttonsPanel = new PokerUserPanel();    buttonsPanel.updateContext({      score: window.sessionStorage.playerScore,      bet: window.sessionStorage.playerBet    });    this.el.innerHTML += buttonsPanel.render();    this.game.startRound();    // window.requestAnimationFrame(pokerGame);  }}// }// let counter = 100;