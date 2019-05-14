import React, { Component } from "react";
import Tone from "tone";
import * as THREE from "three";
const OrbitControls = require("three-orbit-controls")(THREE);

export default class VisualizerComponent extends Component {
  constructor() {
    super();
    this.analyser = new Tone.Analyser("fft", 16);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.sphere = null;
    this.controls = require("three-orbit-controls")(THREE);
    Tone.Master.connect(this.analyser);
  }

  componentDidMount() {
    const V_WIDTH = window.innerWidth,
      V_HEIGHT = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      15,
      V_WIDTH / V_HEIGHT,
      1,
      1000
    );
    this.camera.position.set(0, 600, 0);
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(V_WIDTH, V_HEIGHT);
    document
      .querySelector("#visualizer-wrapper")
      .appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const values = this.analyser.getValue();
    const RADIUS = 50;
    const SEGMENTS = 16;
    const RINGS = 16;

    const sphereGeometry = new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS);

    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    sphere.position.x = 0;
    sphere.position.z = 0;

    // Finally, add the sphere to the scene.
    this.scene.add(sphere);
    this.sphere = sphere;
    this.renderer.render(this.scene, this.camera);
    this.draw();
  }

  draw = () => {
    const bassValue = Math.abs(this.analyser.getValue()[0]);
    this.sphere.rotation.y +=0.1;
    if(bassValue > 20) this.sphere.scale.set(bassValue/100, bassValue/100, bassValue/100)
    if (this.renderer) this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.draw);
  };

  render() {
    return (
      <React.Fragment>
        <div id="visualizer-wrapper" />
      </React.Fragment>
    );
  }
}
