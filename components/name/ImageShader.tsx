import { FlutedGlass } from "@paper-design/shaders-react";

export default function ImageShader(){
    return (
        <FlutedGlass
  width={"100%"}
  height={"100%"}
  image="/BGGweh.webp"
  colorBack="#00000000"
  colorShadow="#000000"
  colorHighlight="#ffffff"
  size={0.01}
  shadows={0}
  highlights={0}
  shape="wave"
  angle={50}
  distortionShape="cascade"
  distortion={0.21}
  shift={0}
  stretch={0.1}
  blur={0.1}
  edges={0}
  margin={0}
  grainMixer={0}
  grainOverlay={0.36}
  fit="cover"
/>
    )
}