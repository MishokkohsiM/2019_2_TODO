import Router from './module/Router/router.js';
import StartScreen from './viewes/StartScreen/StartScreen.js';
import SignUpScreen from './viewes/SignUpScreen/SignUpScreen.js';
import SignInScreen from './viewes/SignInScreen/SignInScreen.js';
import ChangeProfileView from './viewes/Change/ChangeProfile.js';
import NotFoundView from './viewes/NotFoundView/NotFoundView.js';
import ProfileView from './viewes/Profile/Profile.js';
import OfflineGameView from './viewes/OfflineGame/OfflineGameView.js';
import runtime from 'serviceworker-webpack-plugin/lib/runtime.js';
import UserContainer from "./module/User/UserContainer";
import MultiPlayerView from "./viewes/MultiplayerView/MultiPlayerView";


if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
window.user = new UserContainer();
const application = document.getElementById('application');
window.router = new Router(application);
window.router.register('/', StartScreen)
    .register('/signUp', SignUpScreen)
    .register('/signIn', SignInScreen)
    .register('/profileChange', ChangeProfileView)
    .register('/profile', ProfileView)
    .register('/offline', OfflineGameView)
    .register('/notFound', NotFoundView)
    .register('/online', MultiPlayerView);

window.user.checkAuth().finally(()=>{
  router.start();
});

