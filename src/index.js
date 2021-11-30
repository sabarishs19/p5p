import React from "react";
import ReactDOM from "react-dom";
import { Canvas } from "p5-react-renderer";
import ParticleSystem from "./ParticleSystem";

function App() {
  return (
    <Canvas size={[750, 750]} background="#010730" noStroke noClear>
      <colorMode args={(p5) => [p5.RGB]}>
        <ParticleSystem num={300} />
      </colorMode>
    </Canvas>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
