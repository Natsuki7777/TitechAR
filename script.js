window.addEventListener("load", () => {
  let buildings = staticLoadbuildeings();
  renderPlaces(buildings);
});

window.addEventListener("gps-camera-update-position", (e) => {
  console.log(e);
  const distances = document.querySelectorAll(".distance");
  console.dir(distances);
  distances.forEach((distance) => {
    v3 = distance.getAttribute("position");
    x = v3.x;
    y = v3.y;
    z = v3.z;
    dl = Math.floor(
      Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
    );
    console.log(distance.getAttribute("position"));
    distance.setAttribute("value", `${dl}m`);
  });
});

function renderPlaces(buildings) {
  let scene = document.querySelector("a-scene");

  buildings.forEach((building) => {
    let building_name = building.name;
    let latitude = building.location.lat;
    let longitude = building.location.lng;
    let building_hight = building.hight;
    let model_type = building.model_type;
    let caption = building.caption;
    let open_time = building.open_time;
    const scale = 60;
    // let scale = building.scale;

    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-projected-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    model.setAttribute("position", { x: 0, y: building_hight, z: 0 });
    model.setAttribute(
      "gltf-model",
      `./assets/model/${model_type}/${model_type}.gltf`
    );
    model.setAttribute("animation-mixer", "");
    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    //------------------文字--------------------------------
    let discription = document.createElement("a-text");
    discription.setAttribute(
      "gps-projected-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    discription.setAttribute("position", { x: 10, y: building_hight, z: 0 });
    discription.setAttribute("scale", {
      x: scale,
      y: scale,
      z: scale,
    });
    discription.setAttribute("font", "./assets/font/custom-msdf.json");
    discription.setAttribute("font-image", "./assets/font/custom.png");
    discription.setAttribute("value", building_name);
    discription.setAttribute("negate", false);
    discription.setAttribute("color", "black");
    discription.setAttribute("look-at", "[camera]");

    //------------------距離--------------------------------
    let distance = document.createElement("a-text");
    distance.setAttribute(
      "gps-projected-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    distance.setAttribute("class", "distance");
    distance.setAttribute("position", {
      x: 10,
      y: building_hight - 20,
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

    console.dir(distance);

    scene.appendChild(model);
    scene.appendChild(discription);
    scene.appendChild(distance);
  });
}

function staticLoadbuildeings() {
  return [
    {
      id: 1,
      name: "本館",
      location: {
        lat: 35.60456954,
        lng: 139.68385423,
      },
      hight: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
    {
      id: 2,
      name: "滝プラザ",
      location: {
        lat: 35.60618984,
        lng: 139.68464816,
      },
      hight: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
    {
      id: 3,
      name: "東京工業大学附属図書館",
      location: {
        lat: 35.60644499,
        lng: 139.68397225,
      },
      hight: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
    {
      id: 4,
      name: "百年記念館",
      location: {
        lat: 35.6068287769,
        lng: 139.68478654721,
      },
      hight: 20,
      model_type: "pin",
      caption: "",
      open_time: "",
    },
  ];
}
