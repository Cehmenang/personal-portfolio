import { LensDistortion } from '@paper-design/shaders-react';

export default function AboutShader(){
    return (
        <LensDistortion
  width={1280}
  height={720}
  image="https://paper.design/flowers.webp"
  spread={0.5}
  bias={0}
  angle={52}
  perspective={0.23}
  count={50}
  dispersion={0}
  dispersionShift={0.02}
  dispersionColor={1}
  focusCenter={0.59}
  focusEdges={1}
  swirl={0}
  noise={1}
  noiseFrequency={0}
  noiseOffset={0}
  lensBulge={0}
  lensCircle={0}
  grainMixer={0}
  grainOverlay={0.4}
  imageX={0}
  imageY={0}
  fit="contain"
/>
    )
}
