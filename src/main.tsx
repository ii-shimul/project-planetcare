import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import AuthProvider from "./providers/AuthProvider";
import "@ant-design/v5-patch-for-react-19";
const queryClient = new QueryClient();
import { unstableSetRender } from "antd";

unstableSetRender((node, container) => {
  const c = container as any;
  c._reactRoot ||= createRoot(container as HTMLElement);
  const root = c._reactRoot as any;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}></RouterProvider>
			</QueryClientProvider>
		</AuthProvider>
	</StrictMode>
);
