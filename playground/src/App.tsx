import { Canvas } from "@react-three/fiber";
import { Fullscreen, Container, Text } from "@react-three/uikit";
import { useLocation, Switch, Route, Redirect } from "wouter";
import * as components from "../../src";

const componentMap: Record<string, any> = {};

Object.values(components).forEach((mod: any) => {
  const Component = mod.default || mod;
  const meta = Component.metadata;

  if (meta?.name) {
    componentMap[meta.name.toLowerCase()] = Component;
  }
});

const colors = [
  "#87C4A3",
  "#EF9F64",
  "#9B7FE6",
  "#E794AE",
  "#F4696B",
  "#63C5AB",
  "#F4C3C5",
  "#FEC54F",
  "#98BFF6",
  "#de89ac",
  "#9B7AD5",
  "#FD9372",
  "#ccc5e3",
  "#F68F6F",
  "#3CCAD1",
  "#DFBC94",
  "#FDACB4",
  "#FDACB4",
  "#79BBB5",
  "#A0CADB",
  "#a09de5",
  "#785ebb",
  "#84A5DD",
];

const generateData = Array.from(
  { length: 3 * 18 + 3 * 6 + 1 + 3 },
  (_, index) => ({
    No: index + 1,
    cell: 1,
    color: colors[Math.floor(Math.random() * colors.length)],
  }),
)
  .fill({ No: 2, cell: 16, color: "#ffffff00" }, 1, 2)
  .fill({ No: 6, cell: 10, color: "#ffffff00" }, 5, 6)
  .fill({ No: 16, cell: 9, color: "#ffffff00" }, 15, 16);

const componentList = Object.values(components)
  .map((mod: any) => mod.default?.metadata || mod?.metadata)
  .filter(Boolean);

const skipIndices = [1, 5, 15]; // No 2, 6, 16

let componentIndex = 0;

const periodicTableData = generateData.map((gridItem, index) => {
  if (skipIndices.includes(index)) {
    return { ...gridItem, isSpacer: true };
  }

  const componentMeta = componentList[componentIndex];
  if (componentMeta) {
    componentIndex++;
    return {
      ...gridItem,
      isSpacer: false,
      meta: componentMeta,
    };
  }

  return { ...gridItem, isSpacer: true };
});

export default function App() {
  const [location, navigate] = useLocation();

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], far: 1000 }}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
      onCreated={({ gl }) => gl.setClearColor("#f0f0f0")}
    >
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <ambientLight intensity={0.4} />
      <spotLight
        castShadow
        angle={0.3}
        penumbra={1}
        position={[0, 10, 20]}
        intensity={5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Switch location={location}>
        <Route path="/doodles/">
          <Table />
        </Route>
        <Route path="/doodles/:No">
          {(params) => {
            const targetName = params.No?.toLowerCase();
            const TargetComponent = componentMap[targetName];

            if (TargetComponent) {
              return <TargetComponent />;
            } else {
              return <>{navigate("/doodles/")}</>;
            }
          }}
        </Route>
        <Redirect to="/doodles/" />
      </Switch>
    </Canvas>
  );
}

const Table = () => {
  const [, navigate] = useLocation();
  const _data = periodicTableData;

  return (
    <Fullscreen
      flexDirection="row"
      flexWrap="wrap"
      padding={0}
      gap={0}
      alignContent="stretch"
      alignItems="stretch"
    >
      {_data
        // .filter(
        //   (item): item is Extract<typeof item, { meta: any }> => !item.isSpacer,
        // )
        .map((k, i) => {
          const widthPercent = (k.cell / 18) * 100;
          const hasMeta = !k.isSpacer;

          return (
            <Container
              key={i}
              flexBasis={`${widthPercent}%`}
              flexGrow={0}
              flexShrink={0}
              height="16.6%" // 100/6 ≈ 16.6
              padding={2}
            >
              <Container
                flexGrow={1}
                backgroundColor={hasMeta ? k.color : "transparent"}
                borderRadius={2}
                alignItems="center"
                justifyContent="center"
                cursor={hasMeta ? "pointer" : undefined}
                // backgroundOpacity={hasMeta ? 0.2 : 1}
                // hover={!hasMeta ? { brightness: 1.2 } : {}}
                onClick={() => navigate((k as any).meta?.name.toLowerCase())}
              >
                {/*{i === 1 && (
                <Text fontSize={32} fontWeight="bold">
                  POSTPROCESSING
                </Text>
              )}*/}
                {/*{i === 5 && <Text fontSize={26}>Effects for React</Text>}*/}
                {/*{i === 15 && <Text fontSize={24}>work</Text>}*/}

                {hasMeta && (
                  <Text
                    fontSize={12}
                    color="white"
                    wordBreak="break-word"
                    // whiteSpace="normal"
                    textAlign="center"
                    lineHeight={1.2}
                  >
                    {(k as any).meta?.name}
                  </Text>
                )}
              </Container>
            </Container>
          );
        })}
    </Fullscreen>
  );
};
