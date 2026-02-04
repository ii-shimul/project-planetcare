import { Skeleton } from "antd";

const EventSkeleton: React.FC<{ index: number }> = ({ index }) => (
	<div
		key={index}
		className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden"
	>
		<Skeleton.Image
			active
			style={{ width: "100%", height: 192 }}
			className="!w-full !h-48"
		/>
		<div className="p-6 flex flex-col grow">
			<Skeleton
				active
				paragraph={false}
				title={{ width: "60%" }}
				className="!mb-2"
			/>
			<Skeleton
				active
				paragraph={{ rows: 2, width: ["100%", "85%"] }}
				title={false}
				className="!mt-2"
			/>
			<div className="mt-4 space-y-1 grow">
				<Skeleton active paragraph={{ rows: 1, width: "50%" }} title={false} />
				<Skeleton active paragraph={{ rows: 1, width: "45%" }} title={false} />
				<Skeleton active paragraph={{ rows: 1, width: "35%" }} title={false} />
			</div>
			<div className="mt-4 flex gap-2">
				<Skeleton.Button active style={{ width: 70, height: 38 }} />
				<Skeleton.Button active style={{ flex: 1, height: 38 }} />
				<Skeleton.Button active style={{ width: 44, height: 38 }} />
			</div>
		</div>
	</div>
);

export default EventSkeleton;
