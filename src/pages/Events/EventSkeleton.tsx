import { Card, Skeleton } from "antd";
import React from "react";

const EventSkeleton: React.FC<{ index: number }> = ({ index }) => (
	<Card
		key={index}
		bordered
		style={{
			padding: "24px",
			borderRadius: "12px",
			borderColor: "#d9d9d9",
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		}}
		bodyStyle={{ padding: 0, display: "flex", flexDirection: "column" }}
	>
		<Skeleton
			active
			paragraph={{ rows: 1, width: "75%" }}
			title={false}
			style={{ marginBottom: "8px" }}
		/>
		<Skeleton
			active
			paragraph={{ rows: 1, width: "100%" }}
			title={false}
			style={{ marginBottom: "16px" }}
		/>
		<div style={{ flexGrow: 1, marginBottom: "16px" }}>
			<Skeleton
				active
				paragraph={{ rows: 1, width: "66%" }}
				title={false}
				style={{ marginBottom: "8px" }}
			/>
			<Skeleton active paragraph={{ rows: 1, width: "66%" }} title={false} />
		</div>
		<Skeleton active paragraph={{ rows: 1, width: "100%" }} title={false} />
	</Card>
);

export default EventSkeleton;
