//import * as OBJLoader from './libs/OBJLoader.js';
import * as THREE from 'three';
import * as GLTFLoader from './libs/GLTFLoader.js';


async function loadModels(scene) {
    const gltfLoader = new GLTFLoader.GLTFLoader();


    try {
        const glbLego = await gltfLoader.loadAsync('./sources/legoood+cs.glb');
        glbLego.receiveShadow = true;
        glbLego.castShadow = true;
        scene.add(glbLego.scene);

        console.log('Models loaded');
    }
    catch (error) {
        console.error(error);
    }
}



export { loadModels };


