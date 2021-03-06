import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Particle from "./Particle";
import FlowField from "./FlowField";
import { useP5, useDraw } from "p5-react-renderer";

function fetchStroke(p5) {
  const r = p5.random(100);
  if (r < 25) {
    return [194, 194, 194, 25];
  } else {
    return [39, 255, 0, 100];
  }
}

export default function ParticleSystem({ num }) {
  const scale = 10;
  const p5 = useP5();
  const particles = useRef(null);
  const flowfield = useRef(null);

  useEffect(() => {
    particles.current = new Array(num).fill(null).map(() => new Particle(p5));

    flowfield.current = new FlowField(
      scale,
      p5.floor(p5.width / scale),
      p5.floor(p5.height / scale)
    );
  }, []);

  useDraw(() => {
    flowfield.current.generateField(p5);
    particles.current.forEach((p) => {
      flowfield.current.applyForceToParticle(p);
      p.update(flowfield.current);
    });
  });

  let particleEls = null;
  if (particles.current) {
    particleEls = particles.current.map((p, i) => {
      const args = [p.pos.x, p.pos.y, p.prevPos.x, p.prevPos.y];
      p.updatePrev();
      return <line stroke={fetchStroke} key={i} args={args} />;
    });
  }

  return <React.Fragment>{particleEls}</React.Fragment>;
}

ParticleSystem.propTypes = {
  num: PropTypes.number
};
