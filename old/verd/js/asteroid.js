// import * as THREE from 'https://cdn.skypack.dev/three';
import * as THREE from 'https://cdn.skypack.dev/three@0.138.2';




const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(20, 1, 0.01, 1000)
// parameters for camera: field of view, aspect ratio, near clipping plane, far clipping plane

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
  alpha: true,
    antialias: true
});

// renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(300, 300);
camera.position.setZ(20);
// camera.position.setX(7);

renderer.render(scene, camera);

const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

// create a directional light pointing at the asteroid, make it red
const light = new THREE.PointLight( 0xffffff, 1.8, 100 );
light.position.set( -30, 0, 40 );
scene.add( light );
// show where all the lights are on the page
console.log(scene);

// Normal Material
const asteroidMaterial = new THREE.MeshLambertMaterial({
    // map it with a texture of the asteroid in img folder
    map: new THREE.TextureLoader().load('./img/mars.jpg'),
})
// Shader Material


const asteroidGeometry = new THREE.SphereGeometry(3, 50, 50);
let asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
scene.add(asteroid);

let width = screen.width;

if(width > 800){
  asteroid.position.x = 0;
  asteroid.position.y = 0;
  asteroid.position.z = 0;
}
else{
  asteroid.position.y = 0;
  asteroid.position.z = -25;
  asteroid.position.x = 0;
  light.position.set( -30, 0, 15);
}









function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    asteroid.rotation.x += .001
    asteroid.rotation.y += .005

    // move the light in a circle around the asteroid
    // light.position.x = Math.sin(Date.now() * 0.001) * 50;
  }
  
animate();
// asteroid.position