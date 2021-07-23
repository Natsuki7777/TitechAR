window.addEventListener("load", () => {
  let models = staticLoadModels();
  renderPlaces(models);
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
    console.log("init!!!!!!!");
    console.log(this.data.value);
    this.el.addEventListener("click", function (evt) {
      consol.log(this.data.value);
      document.getElementById("caption").innerHTML = this.data.value;
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

    //------------------3Dオブジェクト--------------------------------
    let entity = document.createElement("a-entity");
    entity.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    entity.setAttribute("position", { x: 0, y: height, z: 0 });
    entity.setAttribute(
      "gltf-model",
      `./assets/model/${modelname}/${modelname}.gltf`
    );

    entity.setAttribute("animation-mixer", "");
    if (link) {
      entity.setAttribute("link", `href:${link}`);
    }
    if (caption) {
      entity.setAttribute("cursor-listener", `value:${caption}`);
    }
    scene.appendChild(entity);

    //------------------文字--------------------------------
    if (labelEnable) {
      let discription = document.createElement("a-text");
      discription.setAttribute(
        "gps-entity-place",
        `latitude: ${latitude}; longitude: ${longitude};`
      );
      discription.setAttribute("position", { x: 5, y: height + 8, z: 0 });
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
  });
}

function staticLoadModels() {
  return [
    {
      id: 1,
      name: "本館",
      location: {
        latitude: 35.610087429851006,
        longitude: 139.67916517782328,
        height: 20,
      },
      model: "pin",
      label: true,
      minDistance: 0,
      maxDistance: 0,
      distance: true,
      caption: "hello World",
      link: "",
    },
    {
      id: 2,
      name: "滝プラザ",
      location: {
        latitude: 35.60618984,
        longitude: 139.68464816,
        height: 20,
      },
      model: "pin",
      label: true,
      minDistance: 0,
      maxDistance: 0,
      distance: true,
      caption: "",
      link: "",
    },
    {
      id: 3,
      name: "東京工業大学附属図書館",
      location: {
        latitude: 35.60644499,
        longitude: 139.68397225,
        height: 20,
      },
      model: "pin",
      label: true,
      minDistance: 0,
      maxDistance: 0,
      distance: true,
      caption: "",
      link: "",
    },
    {
      id: 4,
      name: "百年記念館",
      location: {
        latitude: 35.6068287769,
        longitude: 139.68478654721,
        height: 20,
      },
      model: "pin",
      label: true,
      minDistance: 0,
      maxDistance: 0,
      distance: true,
      caption: "",
      link: "",
    },
  ];
}
