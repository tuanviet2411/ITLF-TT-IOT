// Cấu hình Firebase cho ứng dụng web ...
const firebaseConfig = {
  apiKey: "AIzaSyDPLvWSNJvUW4Yl1dSrg-U0yQ4zta0Hbcs",
  authDomain: "itfl-7cfb5.firebaseapp.com",
  databaseURL: "https://itfl-7cfb5-default-rtdb.firebaseio.com",
  projectId: "itfl-7cfb5",
  storageBucket: "itfl-7cfb5.appspot.com",
  messagingSenderId: "416301780431",
  appId: "1:416301780431:web:f489de2968a7cc6e91d6ba",
  measurementId: "G-QBG4GN4LSZ"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Tự động tải nhiệt độ-------------------------
database.ref("/TT_IoT/Temp").on("value", function (snapshot) {
  var nd = snapshot.val(); // Lấy giá trị nhiệt độ từ cơ sở dữ liệu
  document.getElementById("nhietdo").innerHTML = nd; // Cập nhật nhiệt độ trên trang web
  console.log(nd); // In nhiệt độ ra console
});

// Tự động tải độ ẩm-------------------------
database.ref("/TT_IoT/Humi").on("value", function (snapshot) {
  var da = snapshot.val(); // Lấy giá trị độ ẩm từ cơ sở dữ liệu
  document.getElementById("doam").innerHTML = da; // Cập nhật độ ẩm trên trang web
  console.log(da); // In độ ẩm ra console
});

// Tự động tải Lượng mua-------------------------
database.ref("/TT_IoT/Gas").on("value", function (snapshot) {
  var lm = snapshot.val(); // Lấy giá trị độ ẩm từ cơ sở dữ liệu
  document.getElementById("luongmua").innerHTML = lm; // Cập nhật độ ẩm trên trang web
  console.log(lm); // In độ ẩm ra console
});



//---------------------------------------------------------------//
// Đèn 01-------------------------------------------------------
var d01_on = document.getElementById("d01_on"); // Khai báo biến nút bật đèn 01
var d01_off = document.getElementById("d01_off"); // Khai báo biến nút tắt đèn 01

d01_on.onclick = function () {
  console.log("d01_on"); // In thông báo bật đèn 02 ra console
  document.getElementById("d01_img").src = "./img/light_bulb_on.png"; // Cập nhật hình ảnh đèn 01 bật

  firebase.database().ref("/TT_IoT").update({
    "BULB": "1" // Cập nhật trạng thái đèn 01 trong cơ sở dữ liệu là bật
  });
};

d01_off.onclick = function () {
  console.log("d01_off"); // In thông báo bật đèn 02 ra console
  document.getElementById("d01_img").src = "./img/light_bulb_off.png"; // Cập nhật hình ảnh đèn 01 tắt

  firebase.database().ref("/TT_IoT").update({
    "BULB": "0" // Cập nhật trạng thái đèn 01 trong cơ sở dữ liệu là tắt
  });
};
// Đèn 01 (Kết thúc)-----------------------------------------------------

// Quat-------------------------------------------------------
var d02_on = document.getElementById("d02_on"); 
var d02_off = document.getElementById("d02_off"); 

d02_on.onclick = function () {
  console.log("Quat_on"); // In thông báo bật quat ra console
  document.getElementById("d02_img").src = "./img/quat_on.png"; // Cập nhật hình ảnh quat bật

  firebase.database().ref("/TT_IoT").update({
    "Fan": "1" // Cập nhật trạng thái quat trong cơ sở dữ liệu là bật
  });
};

d02_off.onclick = function () {
  console.log("d02_off"); // In thông báo bật quat ra console
  document.getElementById("d02_img").src = "./img/quat_off.png"; // Cập nhật hình ảnh quạt tắt

  firebase.database().ref("/TT_IoT").update({
    "Fan": "0" // Cập nhật trạng thái quạt trong cơ sở dữ liệu là tắt
  });
};
// Quat (Kết thúc)-----------------------------------------------------

// May Lanh-------------------------------------------------------
var d03_on = document.getElementById("d03_on"); 
var d03_off = document.getElementById("d03_off");

d03_on.onclick = function () {
	console.log("MayLanh_on"); // In thông báo bật may lanh ra console
  document.getElementById("d03_img").src = "./img/maylanh_on.png"; // Cập nhật hình ảnh may lanh 03 bật

  firebase.database().ref("/TT_IoT").update({
    "MayLanh": "1" // Cập nhật trạng thái may lanh trong cơ sở dữ liệu là bật
  });
};

d03_off.onclick = function () {
	console.log("MayLanh_off"); // In thông báo bật may lanh ra console
  document.getElementById("d03_img").src = "./img/maylanh_off.png"; // Cập nhật hình ảnh may lanh tắt

  firebase.database().ref("/TT_IoT").update({
    "MayLanh": "0" // Cập nhật trạng thái may lanh trong cơ sở dữ liệu là tắt
  });
};
// May Lanh (Kết thúc)-----------------------------------------------------

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
////Cap nhat firebase ra Den
firebase.database().ref("/TT_IoT").child('BULB').on('value',function(snapshot) {
	var status = snapshot.val();
	if (status === "1") 
	{
		document.getElementById("d01_img").src = "./img/light_bulb_on.png"; // Cập nhật hình ảnh đèn 01 bật
	}
	else 
	{	
		document.getElementById("d01_img").src = "./img/light_bulb_off.png"; // Cập nhật hình ảnh đèn 01 tắt
	}
});
 ////Cap nhat firebase ra Quat
firebase.database().ref("/TT_IoT").child('Fan').on('value',function(snapshot) {
	var status = snapshot.val();
	if (status === "1") 
	{
		document.getElementById("d02_img").src = "./img/quat_on.png"; // Cập nhật hình ảnh đèn 01 bật
	}
	else 
	{	
		document.getElementById("d02_img").src = "./img/quat_off.png"; // Cập nhật hình ảnh đèn 01 tắt
	}
});
////Cap nhat firebase ra Den3
firebase.database().ref("/TT_IoT").child('MayLanh').on('value',function(snapshot) {
	var status = snapshot.val();
	if (status === "1") 
	{
		document.getElementById("d03_img").src = "./img/maylanh_on.png"; // Cập nhật hình ảnh đèn 01 bật
	}
	else 
	{	
		document.getElementById("d03_img").src = "./img/maylanh_off.png"; // Cập nhật hình ảnh đèn 01 tắt
	}
});