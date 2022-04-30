import './App.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import * as Environment from "./environment"
import Animal from "./animal"

function App() {
  return (
    <div />
  );
}

let WORLD_SIZE = 50;

window.addEventListener('resize', onWindowResize);  // Window resize event listener

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Framerate
let stats = new Stats();
document.body.appendChild(stats.dom);

// Light helper
// const helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);

var geometry = new THREE.BoxGeometry(WORLD_SIZE, 1, WORLD_SIZE);
var material = new THREE.MeshBasicMaterial({ color: "#6d6363" });
var ground = new THREE.Mesh(geometry, material);
scene.add(ground);

let animal1 = new Animal(ground)
scene.add(animal1.mesh);

for (let i = 0; i<10; i++) {
  let animal1 = new Animal(ground)
  scene.add(animal1.mesh);
}

camera.position.x = 25;
camera.position.y = 45;
camera.position.z = 40;

controls.update();
var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  renderer.render(scene, camera);
};
animate();

// Returns true if object1 and object2 intersect
function detectCollision(object1, object2) {
  object1.geometry.computeBoundingBox();
  object2.geometry.computeBoundingBox();
  object1.updateMatrixWorld(true);
  object2.updateMatrixWorld(true);

  let box1 = object1.geometry.boundingBox.clone();
  box1.applyMatrix4(object1.matrixWorld);
  let box2 = object2.geometry.boundingBox.clone();
  box2.applyMatrix4(object2.matrixWorld);

  return box1.intersectsBox(box2);
}

function onWindowResize() {
  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    // Scale camera zoom with viewport dimensions
    if (window.innerWidth > window.innerHeight) {
      camera.zoom = window.innerHeight / window.innerHeight;
    } else {
      camera.zoom = window.innerWidth / window.innerHeight;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, 100);
}

// Environment control constants

let NUMBER_OF_ANIMALS = 3  // 5-10 Recommended


export default App;

// # Environment control constants
// NUMBER_OF_ANIMALS = 3  # 5-10 Recommended
// NUMBER_OF_LAKES = 3  # 1-5 Recommended
// NUMBER_OF_FOOD = 200  # 100-200 Recommended
// FOOD_EFFICIENCY = 0.5  # <0.5 Recommended
// SWIM_PROGRESSION_RATE = 0.10
//
// animals = []
// water = []
// food = []
//
// for k in range(NUMBER_OF_ANIMALS):
//     a = Animal()
//     a.entity.color = color.hex(a.get_colour_from_size())
//     animals.append(a)
//
// for k in range(NUMBER_OF_LAKES):
//     w = Water()
//     water.append(w)
//
// for k in range(NUMBER_OF_FOOD):
//     f = Food()
//     food.append(f)
//
// water = []
//
// for k in range(11):
//     water.append(Water())
//
// def update():
//     for i in range(len(animals)):
//         perform_movement(animals[i])
//         handle_animal_collisions(animals[i], animals)
//         handle_water_collisions(animals[i], water)
//         handle_food_collisions(animals[i], food)
//
//
// def perform_movement(animal_to_move):
//     move_dir = random.randint(1, 4)
//     move_vel = random.uniform(0.01, 0.7)
//
//     if move_dir == 1:
//         animal_to_move.entity.x += move_vel
//     elif move_dir == 2:
//         animal_to_move.entity.x -= move_vel
//     elif move_dir == 3:
//         animal_to_move.entity.y += move_vel
//     else:
//         animal_to_move.entity.y -= move_vel
//
//
// def handle_animal_collisions(animal, arr_of_animals):
//     # Check collisions between animals, smaller animals will be eaten by larger animals
//     for j in range(len(arr_of_animals)):
//         if arr_of_animals[j].entity != animal.entity and arr_of_animals[j].entity.intersects(animal.entity).hit:
//             if arr_of_animals[j].entity.scale_x > animal.entity.scale_x:
//                 # animal j eats i
//                 animal_eats_another(arr_of_animals[j], animal)
//             else:
//                 # animal i eats j
//                 animal_eats_another(animal, arr_of_animals[j])
//             break
//
//
// def handle_water_collisions(animal, arr_of_water):
//     # Check collisions between animals and water, animals who can't swim will drown.
//     for j in range(len(arr_of_water)):
//         if arr_of_water[j].entity.intersects(animal.entity).hit:
//             if arr_of_water[j].depth > animal.swim:
//                 # animal drowns
//                 animal.entity.disable()
//                 animal.entity.collision = False
//             else:
//                 # animal gets better at swimming
//                 animal.swim += arr_of_water[j].depth * SWIM_PROGRESSION_RATE
//             break
//
//
// def handle_food_collisions(animal, arr_of_food):
//     # Check collisions between animals and food, animals who collide with food will grow
//     for j in range(len(arr_of_food)):
//         if arr_of_food[j].entity.intersects(animal.entity).hit:
//             animal_grows(animal, arr_of_food[j].nutrition * FOOD_EFFICIENCY, arr_of_food[j].nutrition * FOOD_EFFICIENCY)
//             arr_of_food[j].entity.disable()
//             arr_of_food[j].entity.collision = False
//             break
//
//
//
//
//
// def animal_eats_another(eater, eaten):
//     eaten.entity.disable()
//     eaten.entity.collision = False
//     animal_grows(eater, eaten.entity.scale_x * FOOD_EFFICIENCY, eaten.entity.scale_y * FOOD_EFFICIENCY)
//
//
// def animal_grows(animal, growth_rate_x, growth_rate_y):
//     animal.entity.scale_x += growth_rate_x
//     animal.entity.scale_y += growth_rate_y
//     animal.entity.animate_color(color.hex(animal.get_colour_from_size()))
//
//
// app.run()