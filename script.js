window.addEventListener("load", () => {
  let models = staticLoadModels();
  renderPlaces(models);
});

// window.addEventListener("gps-camera-update-position", (e) => {
//   console.log(e);
//   let distances = document.querySelectorAll("distance");
//   console.dir(distances);
//   distances.forEach((distance) => {
//     v3 = distance.getAttribute("position");
//     x = v3.x;
//     y = v3.y;
//     z = v3.z;
//     dl = Math.floor(
//       Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
//     );
//     distance.setAttribute("value", `${dl}m`);
//   });
// });

function renderPlaces(Models) {
  let scene = document.querySelector("a-scene");

  Models.forEach((Model) => {
    let name = Model.name;
    let latitude = Model.location.latitude;
    let longitude = Model.location.longitude;
    let height = Model.location.height;
    let modelname = Model.model;
    let caption = Model.caption;
    let label = Model.label;
    let minDistance = Model.minDistance;
    let maxDistance = Model.maxDistance;
    let distancelabel = Model.distance;
    let link = Model.link;
    const scale = 60;
    // let scale = building.scale;

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
    entity.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    //------------------文字--------------------------------
    let discription = document.createElement("a-text");
    discription.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    discription.setAttribute("position", { x: 10, y: height, z: 0 });
    discription.setAttribute("scale", {
      x: scale,
      y: scale,
      z: scale,
    });
    discription.setAttribute("font", "./assets/font/custom-msdf.json");
    discription.setAttribute("font-image", "./assets/font/custom.png");
    discription.setAttribute("value", name);
    discription.setAttribute("negate", false);
    discription.setAttribute("color", "black");
    discription.setAttribute("look-at", "[camera]");

    //------------------距離--------------------------------
    let distance = document.createElement("a-text");
    distance.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    distance.setAttribute("class", "distance");
    distance.setAttribute("position", {
      x: 10,
      y: height - 20,
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
    distance.addEventListener("gps-camera-update-position", (event) => {
      console.log(event);
      console.log(event.detail.distance);
      distance.setAttribute("value", `${event.detail.distance}}m`);
    });

    console.dir(distance);

    scene.appendChild(entity);
    scene.appendChild(discription);
    scene.appendChild(distance);
  });
}

function staticLoadModels() {
  return [
    {
      id: 1,
      name: "本館",
      location: {
        latitude: 35.61001352182725,
        longitude: 139.67861803770478,
        height: 20,
      },
      model: "pin",
      label: "",
      minDistance: 0,
      maxDistance: 0,
      distance: true,
      caption: "",
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
      label: "",
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
      label: "",
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
      label: "",
      minDistance: 0,
      maxDistance: 0,
      distance: true,
      caption: "",
      link: "",
    },
  ];
}
