import { Skeleton } from "antd";

const EventCardSkeleton = () => {
	return (
		<div className="border rounded-2xl bg-white border-gray-300 overflow-hidden">
			<Skeleton.Image
				active
				style={{ width: "100%", height: 192 }}
				className="!w-full !h-48"
			/>
			<div className="p-5 space-y-2">
				<Skeleton
					active
					paragraph={false}
					title={{ width: "70%" }}
					className="!mb-2"
				/>
				<Skeleton
					active
					paragraph={{ rows: 2, width: ["100%", "80%"] }}
					title={false}
				/>
				<div className="flex items-center justify-between pt-2">
					<Skeleton.Button active size="small" style={{ width: 120 }} />
					<Skeleton.Button active size="small" style={{ width: 80 }} />
				</div>
			</div>
		</div>
	);
};

export default EventCardSkeleton;
