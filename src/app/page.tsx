"use client";
import React from "react";
import { pinport } from "@/services/pinport";
import Image from "next/image";

const createPin = async () => {
	await pinport.createPins([
		{
			html: "<style>p { color: white }</style><p>Heii<p>",
			meta_id: "sBooEVRxE8f",
			position: { x: 0, y: -0.008, z: 0 },
			alert: true,
			enableLine: true,
			offset: { x: 0, y: 0.3, z: 0 },
			icon: "",
			opacity: 100,
		},
	]);
};

export default function Home() {
	const container = React.useRef<HTMLDivElement>(null);
	const [change, setChange] = React.useState(0);
	const [sdk, setSdk] = React.useState<any>(null);
	const [currentMesh, setCurrentMesh] = React.useState<any>(null);
	const [scenes, setScenes] = React.useState<{ mesh: any; url: string }[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (!container.current || typeof window === "undefined") return;
		if (container.current.childNodes.length) return;
		pinport.extensions.mapport
			.setupSdk(container.current, "create")
			.then((sdk) => {
				setSdk(sdk);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [change]);

	return (
		<main className="w-full h-screen flex items-center justify-center max-w-screen-xl mx-auto">
			<input
				type="file"
				hidden
				id="add-image"
				onChange={(ev) => {
					if (!ev.target.files) return;
					const file = ev.target.files[0];
					const url = URL.createObjectURL(file);
          
					if (sdk) {
            const mesh = sdk.createMesh(url);
            sdk.addScene(mesh);
						setCurrentMesh(mesh);
            setScenes([...scenes, { mesh: mesh, url }]);
					}

					ev.target.value = "";
				}}
			/>

			<div className="flex flex-col w-full h-full items-center justify-center space-y-8">
				<div className="aspect-video max-w-2xl w-full relative rounded-xl ring-offset-zinc-950 ring-purple-800/50 ring-4 ring-offset-4 overflow-hidden">
					{!scenes.length && (
						<div className="w-full flex justify-center items-center h-full absolute top-0 left-0 bg-zinc-900">
							<span className="text-white/60 text-sm italic">
								Nenhuma imagem adicionada.
							</span>
						</div>
					)}
					<div
						ref={container}
						className="w-full h-full cursor-grab active:cursor-grabbing"
					/>
				</div>
				<div className="flex flex-wrap gap-8">
					{scenes.map((scene, index) => (
						<div
							role="button"
							key={index.toString()}
							className="text-white/60 max-w-[200px] relative bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 ease-in-out px-4 py-2 rounded-md"
							onClick={() => {
								sdk?.updateScene(currentMesh, scene.mesh);
							}}
							onKeyUp={() => {}}
						>
							<Image
								alt=""
								src={scene.url}
								width={200}
								height={200}
								className="w-full h-full object-cover"
							/>
							<button
								onClick={() => {
                  sdk?.removeMesh(scene.mesh);
									setScenes(scenes.filter((_, i) => {
                    return i !== index;
                  }));
								}}
								type="button"
								className="absolute top-2 right-2 bg-red-500 p-2 rounded aspect-square w-[3rem] h-[3rem] text-sm"
							>
								X
							</button>
						</div>
					))}
					<label
						htmlFor="add-image"
						className="text-white/60 cursor-pointer h-fit self-center bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 ease-in-out px-4 py-2 rounded-md"
					>
						+
					</label>
				</div>
			</div>
		</main>
	);
}
