import * as THREE from 'three';


// FOR CUBE 2
// Source : https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/shader-material-hatch/main.js

const shader_hatch = {};
// unifrom values for hatching shader
shader_hatch.uniforms = {
    uDirLightPos: { type: 'v3', value: new THREE.Vector3() },
    uDirLightColor: { type: 'c', value: new THREE.Color(0xeeeeee) },
    uAmbientLightColor: { type: 'c', value: new THREE.Color(0x050505) },
    uBaseColor: { type: 'c', value: new THREE.Color(0xffffff) },
    uLineColor1: { type: 'c', value: new THREE.Color(0x000000) }
};
// vertex shader for hatching shader
shader_hatch.vertexShader = [
    'varying vec3 vNormal;',
    'void main() {',
    '     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '     vNormal = normalize( normalMatrix * normal );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_hatch.fragmentShader = [
    //'uniform vec3 uBaseColor;',
    'uniform vec3 uLineColor1;',
    'uniform vec3 uDirLightPos;',
    'uniform vec3 uDirLightColor;',
    'uniform vec3 uAmbientLightColor;',
    'varying vec3 vNormal;',
    'const float fSpace = 10.0;',    // added an fSpace Float
    '',
    'void main() {',
    '    float directionalLightWeighting = max( dot( vNormal, uDirLightPos ), 0.0);',
    '    vec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;',
    '    float len = length(lightWeighting);',     // added a len Float
    //'    gl_FragColor = vec4( uBaseColor, 1.0 );',
    '    vec3 color = vec3(len * 0.50);', // figured out how to mutate color
    //'    color[0] = len * 0.40;',
    '    gl_FragColor = vec4(color, 1.0);',
    '    if ( len < 1.00 ) {',
    '        float n = mod(gl_FragCoord.x + gl_FragCoord.y, fSpace);', // added a n Float for each of these
    '        if ( n < 4.0 ) {', // new expression that allows for thicker lines
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.75 ) {',
    '        float n = mod(gl_FragCoord.x - gl_FragCoord.y, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.50 ) {',
    '        float n = mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.25 ) {',
    '        float n = mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '}'
].join('\n');


// FOR CUBE 1
// Source : https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi
function vertexShader() {
    return `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `
}

function fragmentShader() {
    return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `
}

// FOR CUBE 3
// Source : https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderLib.js built in shaders


export { shader_hatch, vertexShader, fragmentShader };