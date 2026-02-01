import { useState } from "react";
import Header from "../../components/Header/Header";

import { Form, Input, Typography, message } from "antd";

const { Text } = Typography;

const Contact = () => {
	const [form] = Form.useForm();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const handleSubmit = (values: any) => {
		setIsSubmitting(true);
		setTimeout(() => {
			message.success("Thank you for contacting us");
			form.resetFields();
			setIsSubmitting(false);
		}, 1000);
	};
	return (
		<div>
			<Header
				title="Get in Touch"
				subtitle="We'd love to hear from you. Whether you have a question, a suggestion, or want to partner with us, we're here to help."
			/>
			<section className="py-20 ">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid md:grid-cols-2 gap-8 items-start">
						<div className="px-8 rounded-lg shadow-lg">
							<h2 className="text-3xl font-bold text-primary mb-6">
								Send Us a Message
							</h2>
							<Form
								form={form}
								onFinish={handleSubmit}
								layout="vertical"
								className="space-y-4"
							>
								<Form.Item
									label={
										<Text
											strong
											style={{
												fontFamily: "sora",
												fontSize: "0.875rem",
												color: "#6B7280",
												marginBottom: "0.5rem",
											}}
										>
											Full Name
										</Text>
									}
									name="name"
									rules={[
										{ required: true, message: "Please enter your full name!" },
									]}
								>
									<Input
										id="name"
										placeholder="John Doe"
										type="text"
										className="w-full  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</Form.Item>

								<Form.Item
									label={
										<Text
											strong
											style={{
												fontFamily: "sora",
												fontSize: "0.875rem",
												color: "#6B7280",
												marginBottom: "0.5rem",
											}}
										>
											Email Address
										</Text>
									}
									name="email"
									rules={[
										{ required: true, message: "Please enter your email!" },
										{ type: "email", message: "Please enter a valid email!" },
									]}
								>
									<Input
										id="email"
										placeholder="you@example.com"
										type="email"
										className="w-full  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</Form.Item>

								<Form.Item
									label={
										<Text
											strong
											style={{
												fontFamily: "sora",
												fontSize: "0.875rem",
												color: "#6B7280",
												marginBottom: "0.5rem",
											}}
										>
											Subject
										</Text>
									}
									name="subject"
									rules={[
										{ required: true, message: "Please enter a subject!" },
									]}
								>
									<Input
										id="subject"
										placeholder="Question about an event"
										type="text"
										className="w-full  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</Form.Item>

								<Form.Item
									label={
										<Text
											strong
											style={{
												fontFamily: "sora",
												fontSize: "0.875rem",
												color: "#6B7280",
												marginBottom: "0.5rem",
											}}
										>
											Message
										</Text>
									}
									name="message"
								>
									<Input.TextArea
										id="message"
										placeholder="Your message here..."
										rows={5}
										className="w-full  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									/>
								</Form.Item>

								<Form.Item className="text-right">
									<button disabled={isSubmitting} className="text-white disabled:cursor-not-allowed hover:bg-primary-hover cursor-pointer hover:scale-105 duration-200 px-6 py-2 rounded-xl bg-primary transition-all">
										Send Message
									</button>
								</Form.Item>
							</Form>
						</div>
						<div>
							<div className="p-8 pt-0 rounded-lg shadow-lg mb-8">
								<h3 className="text-2xl font-bold text-primary mb-4">
									Contact Information
								</h3>
								<div className="space-y-4 text-subtext-light dark:text-subtext-dark">
									<div className="flex items-center">
										<span className="material-icons text-primary mr-4">
											email
										</span>
										<p>planet@care.com</p>
									</div>
									<div className="flex items-center">
										<span className="material-icons text-primary mr-4">
											phone
										</span>
										<p>(123) 456-7890</p>
									</div>
									<div className="flex items-center">
										<span className="material-icons text-primary mr-4">
											location_on
										</span>
										<p>123 Mali Road, Sylhet City, 54321</p>
									</div>
								</div>
							</div>
							<div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg overflow-hidden">
								<div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
									<iframe
										allowFullScreen
										className="w-full h-full border-0"
										height={450}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2335.024659383967!2d91.85959215288324!3d24.904645543219328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1759515569510!5m2!1sen!2sus"
										style={{ border: 0 }}
										width={600}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Contact;
