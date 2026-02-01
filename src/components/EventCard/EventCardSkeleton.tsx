import { Card, Skeleton } from 'antd';
import React from 'react';

const EventCardSkeleton = () => {
  return (
		<Card
			bordered
			style={{
				padding: "20px",
				borderRadius: "16px",
				borderColor: "#d9d9d9",
			}}
			bodyStyle={{ padding: 0 }}
		>
			<Skeleton active paragraph={{ rows: 1, width: ["75%"] }} title={false} />
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: "8px",
				}}
			>
				<Skeleton active paragraph={{ rows: 1, width: "33%" }} title={false} />
				<Skeleton active paragraph={{ rows: 1, width: "80px" }} title={false} />
			</div>
		</Card>
	);
};

export default EventCardSkeleton;
