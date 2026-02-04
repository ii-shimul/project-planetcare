import { Skeleton, Card, Row, Col } from "antd";

const DashboardSkeleton = () => {
	return (
		<div>
			<Row gutter={[16, 16]} className="mb-6">
				{[1, 2, 3, 4].map((i) => (
					<Col xs={24} sm={12} lg={6} key={i}>
						<Card>
							<Skeleton active paragraph={{ rows: 1 }} />
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} lg={12}>
					<Card>
						<Skeleton active paragraph={{ rows: 4 }} />
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card>
						<Skeleton active paragraph={{ rows: 4 }} />
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]}>
				<Col xs={24}>
					<Card>
						<Skeleton active paragraph={{ rows: 6 }} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardSkeleton;
