import * as THREE from 'three';
import * as dat from './libs/dat.gui.module.js';

function addUI(scene, camera) {
    const gui = new dat.GUI();

    // Scene Rotation
    const sceneFolder = gui.addFolder('Scene');

    const sceneRotation = {
        x: 0,
        y: 0,
        z: 0
    };

    const sceneRotationController = sceneFolder.add(sceneRotation, 'x', -Math.PI, Math.PI).name('Rotation X');
    sceneRotationController.onChange(function (value) {
        scene.rotation.x = value;
    });
    sceneRotationController.listen();

    const sceneRotationControllerY = sceneFolder.add(sceneRotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
    sceneRotationControllerY.onChange(function (value) {
        scene.rotation.y = value;
    });
    sceneRotationControllerY.listen();

    const sceneRotationControllerZ = sceneFolder.add(sceneRotation, 'z', -Math.PI, Math.PI).name('Rotation Z');
    sceneRotationControllerZ.onChange(function (value) {
        scene.rotation.z = value;
    });
    sceneRotationControllerZ.listen();

    const resetSceneRotation = {
        Reset: () => {
            scene.rotation.x = 0;
            scene.rotation.y = 0;
            scene.rotation.z = 0;
            sceneRotationController.setValue(0);
            sceneRotationControllerY.setValue(0);
            sceneRotationControllerZ.setValue(0);
        }
    };
    sceneFolder.add(resetSceneRotation, 'Reset');

    sceneFolder.open();

    // Adding spatial sound to the robot https://threejs.org/docs/#api/en/audio/PositionalAudio
    /*
    
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const posAudio = new THREE.PositionalAudio(listener);
    const audioLoader = new THREE.AudioLoader();
    
    audioLoader.load('./sources/dalek_noise.mp3', function (buffer) {
        posAudio.setBuffer(buffer);
        posAudio.setRefDistance(5);
        //posAudio.setVolume(0);
        posAudio.setLoop(true);
        //posAudio.play();
    });
    */

    // Show/hide light helpers
    const lightFolder = gui.addFolder('Lights');
    const lightHelpers = {
        showHelpers: false
    };
    const lightHelpersController = lightFolder.add(lightHelpers, 'showHelpers').name('Show Helpers');
    lightHelpersController.onChange(function (value) {
        scene.children.forEach((child) => {
            if (child.type === 'PointLightHelper' || child.type === 'DirectionalLightHelper' || child.type === 'SpotLightHelper') {
                child.visible = value;
            }
        });
    });
    lightFolder.open();


}

export default addUI;