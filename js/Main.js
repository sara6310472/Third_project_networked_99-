// Main setup
let currentUser;

const app = new App();
const userServer = new UserServer();
const dataServer = new DataServer();
const data = new Data();
const user = new User();
const database = new DataBase();
const netWork = new NetWork();
const userDataBase = new UserDataBase();

const cables = {
    clientNetwork: new Cable('client', 'network'),
    networkUserServer: new Cable('network', 'userServer'),
    networkDataServer: new Cable('network', 'dataServer'),
    networkClient: new Cable('network', 'client'),
    userServerNetwork: new Cable('userServer', 'network'),
    dataServerNetwork: new Cable('dataServer', 'network'),
};
app.init();