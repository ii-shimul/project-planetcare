import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Typography, message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

interface DonationFormValues {
	amount: number;
	message?: string;
}

interface DonationData {
	donorEmail: string;
	amount: number;
	message: string;
	status: string;
	paymentIntentId: string;
	donatedAt: string;
}

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_GATEWAY_PK}`);
const { Text } = Typography;

const DonationFormContent = () => {
	const [form] = Form.useForm<DonationFormValues>();
	const { user } = useAuth();
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState<boolean>(false);
	const [messageApi, contextHolder] = message.useMessage();
	const axiosSecure = useAxiosSecure();

	const handleSubmit = async (values: DonationFormValues) => {
		if (!stripe || !elements) return;

		setLoading(true);
		try {
			const { data } = await axiosSecure.post("/create-payment-intent", {
				amount: values.amount,
			});

			const clientSecret: string = data.clientSecret;
			const cardElement = elements.getElement(CardElement);

			if (!cardElement || !user?.email || !user?.displayName) {
				messageApi.error("Missing required information");
				setLoading(false);
				return;
			}

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement,
					billing_details: {
						name: user.displayName,
						email: user.email,
					},
				},
			});

			if (result.error) {
				messageApi.error(result.error.message || "Payment failed");
			} else if (result.paymentIntent?.status === "succeeded") {
				const donationData: DonationData = {
					donorEmail: user.email,
					amount: values.amount,
					message: values.message || "",
					status: "succeeded",
					paymentIntentId: result.paymentIntent.id,
					donatedAt: new Date().toISOString(),
				};
				await axiosSecure.post("/donations", donationData);

				messageApi.success("Payment successful! Thank you for your donation.");
				form.resetFields();
			}
		} catch (error) {
			messageApi.error("Payment failed. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{contextHolder}
			<Form
				form={form}
				onFinish={handleSubmit}
				layout="vertical"
				style={{
					backgroundColor: "#fff",
					padding: "32px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					borderRadius: "12px",
				}}
				className="space-y-6"
			>
				<Form.Item
					label={
						<Text strong style={{ color: "#374151" }}>
							Amount (BDT)
						</Text>
					}
					name="amount"
					rules={[{ required: true, message: "Please enter an amount!" }]}
				>
					<InputNumber
						min={1}
						placeholder="Amount"
						style={{ width: "100%", padding: "4px", borderRadius: "8px" }}
					/>
				</Form.Item>

				<Form.Item
					label={
						<Text strong style={{ color: "#374151" }}>
							Card Details
						</Text>
					}
					rules={[{ required: true }]}
				>
					<CardElement
						options={{
							style: {
								base: {
									fontSize: "16px",
									color: "#424770",
									"::placeholder": { color: "#aab7c4" },
								},
								invalid: { color: "#9e2146" },
							},
						}}
					/>
				</Form.Item>

				<Form.Item
					label={
						<Text strong style={{ color: "#374151" }}>
							Message (Optional)
						</Text>
					}
					name="message"
				>
					<Input.TextArea
						rows={3}
						placeholder="Write a message..."
						style={{ padding: "12px", borderRadius: "8px" }}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={loading}
						disabled={!stripe || loading}
						style={{
							backgroundColor: "#16a34a",
							borderColor: "#16a34a",
							padding: "12px",
							borderRadius: "8px",
						}}
						className="hover:!bg-green-700"
					>
						Donate Now
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

const DonationForm = () => (
	<Elements stripe={stripePromise}>
		<DonationFormContent />
	</Elements>
);

export default DonationForm;
