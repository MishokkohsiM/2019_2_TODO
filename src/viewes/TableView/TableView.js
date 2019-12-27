import BaseView from '../BaseView/BaseView';
import {TableComponent} from '../../components/TableComponent/TableComponent';
import {HeaderComponent} from '../../components/Header/Header';
import RoomController from '../../module/RoomController/RoomController';
import {OnlineComponent} from '../../components/OnlineComponent/OnlineComponent';
import RoomCreateComponent from "../../components/RoomCreateComponent/RoomCreateComponent";

/** Столы*/
export default class TableView extends BaseView {
  /**
   * Создать
   * @param {HTMLElement} element
   */
  constructor(element) {
    super(element);
    this.roomsController = new RoomController();
  }
  /** Отрисовать*/
  render() {
    this.el.innerHTML = '';
    const application = this.el;
    const header = new HeaderComponent(
        application,
        user.isAuth,
        user.avatar,
        user.username,
    );
    header.render();
    const tables = new OnlineComponent();
    application.appendChild(tables.render());
    // this.addTable('sdgfkjerngkn', '3', '4');
    this.roomsController.rooms.forEach((room) => {
      if (room) {
        this.addTable(room.id, room.actualPlaces, room.places, room.players);
      }
    });
    document.getElementById('createRoom').addEventListener('click', (event) => {
      event.preventDefault();
      const roomCreater = new RoomCreateComponent({});
      this.el.appendChild(roomCreater.render());
      roomCreater.addHandlers();
    });
    addEventListener('updateRooms', (event)=>{
      event.preventDefault();
      document.getElementById('tables').innerHTML = '';
      const rooms = this.roomsController.rooms;
      Object.keys(rooms).forEach((key) => {
        this.addTable(
            key,
            rooms[key].actualPlaces,
            rooms[key].places,
            rooms[key].players,
            rooms[key].minBet,
        );
      });
    });
    //
    const table2 = document.getElementById('tables');
    const table = new TableComponent({
      roomBet: `${2}/${2*2}`,
      taken: '0',
      all: '2',
      id: 'asda',
    }, []);
    table2.appendChild(table.render());
    table.element.addEventListener('click', (event)=>{
      this.roomsController.socket.close();
      router.open(`/multiplayer?room=${id}`);
    }, {once: true});
  }

  /**
   * Доваить стол
   * @param {string} id
   * @param {string} taken
   * @param {string} places
   * @param {Array} players
   */
  addTable(id, taken, places, players = [], minBet = 20) {
    //console.log(id, taken, places, players);
    const tables = document.getElementById('tables');
    const table = new TableComponent({
      roomBet: `${minBet}/${2*minBet}`,
      taken: taken,
      all: places,
      id: id,
    }, players);
    tables.appendChild(table.render());
    table.element.addEventListener('click', (event)=>{
      this.roomsController.socket.close();
      router.open(`/multiplayer?room=${id}`);
    }, {once: true});
  }
  // static addTable(id, taken, places){
  //   const tables = document.getElementById('tables');
  //   const table = new TableComponent({
  //     taken: taken,
  //     all: places,
  //     id: id,
  //   });
  //   const smt = document.createElement('div');
  //
  //   smt.appendChild(table.render());
  //   tables.appendChild(smt);
  //   smt.addEventListener('click', (event)=>{
  //     router.register(`/tables/${id}`, MultiPlayerView);
  //     router.open(`/tables/${id}`, id);
  //   });
  // }
}
