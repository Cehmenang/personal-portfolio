import { GrainGradient } from "@paper-design/shaders-react";

export default function ShaderBackground(){
    return (
    <GrainGradient
  width={"100%"}
  height={"100%"}
  colors={["#26257e", "#b46041", "#a6cd93"]}
  colorBack="#111111"
  softness={0.8}
  intensity={0.8}
  noise={0.05}
  shape="wave"
  speed={1}
  scale={2.28}
  rotation={180}
  offsetY={-0.05}
/>
    )
}