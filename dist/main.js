// Setup

// import './style.css'

console.log("test");
import * as THREE from 'https://cdn.skypack.dev/three';


//three@0.132.2
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);

// const spaceTexture = new THREE.TextureLoader().load('img/bg.jpg');
// spaceTexture.minFilter = THREE.LinearFilter;
// spaceTexture.magFilter = THREE.NearestFilter;
// scene.background = spaceTexture;
// spaceTexture.blendMode.opacity.value = 0.2;

// scene.fog = new THREE.FogExp2(0x03544e, 0.001);
// renderer.setClearColor(scene.fog.color);


let clouds = [];
let asteroids = [];
let stars = [];
const cloudGeo = new THREE.PlaneBufferGeometry(15,15);
const cloudMaterial = new THREE.MeshLambertMaterial({
  map:new THREE.TextureLoader().load('img/smoke-1.png'),
  transparent: true
});



for(let i = 0; i < 40; i++){
let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
let posx = Math.random() * 9 - 7;
let posy = Math.random() * 6 - 2;
let posz = Math.random() * -50;
cloud.position.set(posx,posy,posz);
cloud.rotation.z = Math.random()*2*Math.PI;
cloud.material.opacity = 0.55;
clouds.push(cloud);
scene.add(cloud);
}

// LIGHTS
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(10,0,0);
let directionalLightGreen = new THREE.PointLight(0x00ff08);
directionalLightGreen.position.set(5,-5,4);


let directionalLightBlue = new THREE.PointLight(0x0400ff);
directionalLightBlue.position.set(-10,5,1);

let directionalLightPink = new THREE.PointLight(0xb300ff);
directionalLightPink.position.set(-20,-5,4);

scene.add(directionalLightGreen);
scene.add(directionalLightBlue);
scene.add(directionalLightPink);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(directionalLight);
// scene.add(lightHelper);
// const lightHelperb = new THREE.PointLightHelper(directionalLightBlue);
// scene.add(lightHelperb);




const asteroidGeometry = new THREE.SphereGeometry(2, 20, 12);
const asteroidMaterial = new THREE.MeshBasicMaterial({
   map: new THREE.TextureLoader().load('img/asteroid2.jpg')
  // color: 0xff0000
})



const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
// asteroid.position.set(2, 2, 2);
// asteroid.position.y = -10;
scene.add(asteroid);



// const geometry2 = new THREE.BoxGeometry();
// const material2 = new THREE.MeshStandardMaterial({color: 0xFF6347});
// const torus = new THREE.Mesh(geometry2, material2);
// scene.add(torus);



function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  asteroid.position.z = -200 - ( .5* t);
  asteroid.position.x = .002*t;
  asteroid.position.y = -t * .02 - 20;
  console.log(t);

  // camera.position.z = 30 + t * 0.01;
  camera.position.y = t * 0.02;
  // camera.rotation.y = t * -0.002;
}

document.body.onscroll = moveCamera;
moveCamera();


//animate function
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  asteroid.rotation.x += .01;
  asteroid.rotation.z += .03;
  // asteroid.scale.x += .1;
  // camera.rotation.y += .001;
  
  for(let i = 0; i < clouds.length; i++){
    // clouds[i].rotation.z -= .001;
    clouds[i].rotation.z += .0005;
    // clouds[i].position.z -= .05;
  }
}

animate();




/*  EXAMLPE 3JS HELPERS */
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper() 
// scene.add(gridHelper, lightHelper);








/*  EXAMLPE 3JS CUBE */
// const geometry2 = new THREE.BoxGeometry();
// const material2 = new THREE.MeshStandardMaterial({color: 0xFF6347});
// const torus = new THREE.Mesh(geometry2, material2);
// scene.add(torus);





/*  EXAMLPE 3JS LINE */
// const material = new THREE.LineBasicMaterial({color: 0x0000ff});
// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( geometry, material );
// scene.add( line );
