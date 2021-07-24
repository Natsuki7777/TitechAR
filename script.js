//------------------------firebase----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyD4YpyFameyN-vur5feYE989hb6VpxmNos",
  authDomain: "socialar-9a0d4.firebaseapp.com",
  databaseURL:
    "https://socialar-9a0d4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "socialar-9a0d4",
  storageBucket: "socialar-9a0d4.appspot.com",
  messagingSenderId: "236737913974",
  appId: "1:236737913974:web:31fe2c2f8b3ba475eb6b57",
  measurementId: "G-XJLY1GV226",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.app().storage("gs://socialar-9a0d4.appspot.com");
var database = firebase.database();

var modelRef = firebase.database().ref("/titech");

// -------main------------------------
window.addEventListener("load", () => {
  modelRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    renderPlaces(data);
  });
});

// AFRAME.registerComponent("updatedistance", {
//   schema: {},
//   update: function (olddata) {
//     let dm = this.el.getAttribute("distance");
//     console.log(dm);
//     this.el.setAttribute("value", `${dm}m`);
//   },
// });

AFRAME.registerComponent("cursor-listener", {
  schema: {
    value: { type: "string" },
  },
  init: function () {
    console.log(this.data.value);
    var value = this.data.value;
    this.el.addEventListener("click", function (evt) {
      console.log("clicked!!!!!");
      console.log(value);
      document.getElementById("caption").innerHTML = value;
    });
  },
});

let upDateDistance = () => {
  let distances = document.querySelectorAll(".distance");
  distances.forEach((distance) => {
    let dm = parseInt(distance.getAttribute("distance"));
    if (dm) {
      distance.setAttribute("value", `${dm}m`);
    }
  });
};

setInterval(upDateDistance, 5000);

function renderPlaces(Models) {
  let scene = document.querySelector("a-scene");

  Models.forEach((Model) => {
    let id = Model.id;
    let name = Model.name;
    let latitude = Model.location.latitude;
    let longitude = Model.location.longitude;
    let height = parseFloat(Model.location.height);
    let modelname = Model.model;
    let caption = Model.caption;
    let labelEnable = Model.label;
    let minDistance = Model.minDistance;
    let maxDistance = Model.maxDistance;
    let distanceEnable = Model.distance;
    let link = Model.link;
    const scale = 50;
    // let scale = building.scale;

    if (document.getElementById(id)) {
      //------------------3Dオブジェクト--------------------------------
      let entity = document.getElementById(id);
      entity.setAttribute(
        "gps-entity-place",
        `latitude: ${latitude}; longitude: ${longitude};`
      );
      entity.setAttribute("position", { x: 0, y: height, z: 0 });
      entity.setAttribute("animation-mixer", "");
      if (link) {
        entity.setAttribute("link", `href:${link}`);
      }
      if (caption) {
        entity.setAttribute("cursor-listener", { value: caption });
      }
      //------------------文字--------------------------------
      if (labelEnable) {
        if (document.getElementById(`discription${id}`)) {
          var discription = document.getElementById(`discription${id}`);
        } else {
          var discription = document.createElement("a-text");
          discription.setAttribute("id", `discription${id}`);
        }
        discription.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        discription.setAttribute("position", { x: 5, y: height + 5, z: 0 });
        discription.setAttribute("scale", {
          x: scale,
          y: scale,
          z: scale,
        });
        discription.setAttribute(
          "font",
          "./assets/font/noto-sans-cjk-jp-msdf.json"
        );
        discription.setAttribute(
          "font-image",
          "./assets/font/noto-sans-cjk-jp-msdf.png"
        );
        discription.setAttribute("value", name);
        discription.setAttribute("negate", false);
        discription.setAttribute("color", "black");
        discription.setAttribute("look-at", "[camera]");
        if (link) {
          discription.setAttribute("link", `href:${link}`);
        }
        scene.appendChild(discription);
      }

      //------------------距離--------------------------------
      if (distanceEnable) {
        if (document.getElementById(`distance${id}`)) {
          var distance = document.getElementById(`distance${id}`);
        } else {
          var distance = document.createElement("a-text");
          distance.setAttribute("id", `distance${id}`);
        }
        distance.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        distance.setAttribute("class", "distance");
        // distance.setAttribute("updatedistance", "");
        distance.setAttribute("position", {
          x: 5,
          y: height - 8,
          z: 0,
        });
        distance.setAttribute("scale", {
          x: scale,
          y: scale,
          z: scale,
        });
        distance.setAttribute("value", "");
        distance.setAttribute("color", "black");
        distance.setAttribute("look-at", "[camera]");
        scene.appendChild(distance);
      }
    } else {
      //------------------3Dオブジェクト--------------------------------
      var ref = storage.ref(`/3Dmodel/${modelname}.gltf`).getDownloadURL();
      ref.then((url) => {
        let entity = document.createElement("a-entity");
        entity.setAttribute("id", id);
        entity.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        entity.setAttribute("position", { x: 0, y: height, z: 0 });
        entity.setAttribute("gltf-model", url);

        entity.setAttribute("animation-mixer", "");
        if (link) {
          entity.setAttribute("link", `href:${link}`);
        }
        if (caption) {
          entity.setAttribute("cursor-listener", { value: caption });
        }
        scene.appendChild(entity);
      });

      //------------------文字--------------------------------
      if (labelEnable) {
        let discription = document.createElement("a-text");
        discription.setAttribute("id", `discription${id}`);
        discription.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        discription.setAttribute("position", { x: 5, y: height + 5, z: 0 });
        discription.setAttribute("scale", {
          x: scale,
          y: scale,
          z: scale,
        });
        discription.setAttribute(
          "font",
          "./assets/font/noto-sans-cjk-jp-msdf.json"
        );
        discription.setAttribute(
          "font-image",
          "./assets/font/noto-sans-cjk-jp-msdf.png"
        );
        discription.setAttribute("value", name);
        discription.setAttribute("negate", false);
        discription.setAttribute("color", "black");
        discription.setAttribute("look-at", "[camera]");
        if (link) {
          discription.setAttribute("link", `href:${link}`);
        }
        scene.appendChild(discription);
      }

      //------------------距離--------------------------------
      if (distanceEnable) {
        let distance = document.createElement("a-text");
        distance.setAttribute("id", `distance${id}`);
        distance.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        distance.setAttribute("class", "distance");
        // distance.setAttribute("updatedistance", "");
        distance.setAttribute("position", {
          x: 5,
          y: height - 8,
          z: 0,
        });
        distance.setAttribute("scale", {
          x: scale,
          y: scale,
          z: scale,
        });
        distance.setAttribute("value", "");
        distance.setAttribute("color", "black");
        distance.setAttribute("look-at", "[camera]");
        scene.appendChild(distance);
      }
    }
  });
}

// function staticLoadModels() {
//   return [
//     {
//       id: 1,
//       name: "本館",
//       location: {
//         latitude: 35.610087429851006,
//         longitude: 139.67916517782328,
//         height: 20,
//       },
//       model: "pin",
//       label: true,
//       minDistance: 0,
//       maxDistance: 0,
//       distance: true,
//       caption: "",
//       link: "",
//     },
//     {
//       id: 2,
//       name: "滝プラザ",
//       location: {
//         latitude: 35.60618984,
//         longitude: 139.68464816,
//         height: 20,
//       },
//       model: "pin",
//       label: true,
//       minDistance: 0,
//       maxDistance: 0,
//       distance: true,
//       caption: "",
//       link: "",
//     },
//     {
//       id: 3,
//       name: "東京工業大学附属図書館",
//       location: {
//         latitude: 35.60644499,
//         longitude: 139.68397225,
//         height: 20,
//       },
//       model: "pin",
//       label: true,
//       minDistance: 0,
//       maxDistance: 0,
//       distance: true,
//       caption: "",
//       link: "",
//     },
//     {
//       id: 4,
//       name: "百年記念館",
//       location: {
//         latitude: 35.6068287769,
//         longitude: 139.68478654721,
//         height: 20,
//       },
//       model: "pin",
//       label: true,
//       minDistance: 0,
//       maxDistance: 0,
//       distance: true,
//       caption: "",
//       link: "",
//     },
//   ];
// }
