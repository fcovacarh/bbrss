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
    this.spheres = [];
    this.controls = require("three-orbit-controls")(THREE);
    Tone.Master.connect(this.analyser);
  }

  componentDidMount() {
    const V_WIDTH = 900,
      V_HEIGHT = 500;
    var canvas = document.createElement("canvas");
    canvas.id = "visualization-canvas";
    canvas.width = V_WIDTH;
    canvas.height = V_HEIGHT;
    canvas.style.backgroundColor = "#000";
    document.querySelector("#visualizer-wrapper").appendChild(canvas);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      V_WIDTH / V_HEIGHT,
      0.4,
      1000
    );
    this.camera.position.set(0, 6, 0);
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(V_WIDTH, V_HEIGHT);
    canvas.appendChild(this.renderer.domElement);

    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    this.scene.add(light);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const values = this.analyser.getValue();
    values.forEach(value => {
      const RADIUS = 120;
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
      sphere.position.z = 5;

      // Finally, add the sphere to the scene.
      this.scene.add(sphere);
      this.spheres.push(sphere);
    });
    this.renderer.render(this.scene, this.camera);
    //this.draw();
  }

  draw = () => {
    const values = this.analyser.getValue();
    values.forEach((value, idx) => {});
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
