var websocket = null;
var username = null;
if (window.addEventListener) { //for W3C DOM
  window.addEventListener("load", init, false);
} else if (window.attachEvent) { //for IE
  window.attachEvent("onload", init);
} else {
  window.onload = init;
}

/* 初期化の処理 */
function init() {
  showLoginButton();
}

/* サーバ・エンドポイントとの接続処理 */
function connectServerEndpoint() {
  var wsUri = "ws://"
    + document.location.hostname + ":"
    + document.location.port
    + document.location.pathname + "chat-server";
  // FireFox との互換性を考慮してインスタンス化
  if ("WebSocket" in window) {
    websocket = new WebSocket(wsUri);
  } else if ("MozWebSocket" in window) {
    websocket = new MozWebSocket(wsUri);
  }
  console.log(websocket);


  websocket.onopen = function (evt) {
    showLogoutButton();
  };
  websocket.onmessage = function (evt) {
    ;
  };
  websocket.onerror = function (evt) {
    console.log("WebSocket Error : " + evt);
  };
  websocket.onclose = function (evt) {
    closeServerEndpoint();
  };
}

/* サーバ・エンドポイントとの切断時の処理 */
function closeServerEndpoint() {
  websocket.close(4001, "Close connection from client");
  showLoginButton();
}

/* ログインボタンの表示(未切断の時に表示) */
function showLoginButton() {
  document.getElementById("login").style.display = "block";
  document.getElementById("logout").style.display = "none";
}

/* ログアウトボタンの表示(ログイン後に表示) */
function showLogoutButton() {
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "block";
}