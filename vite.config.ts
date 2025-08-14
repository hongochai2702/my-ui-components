import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true, // Thêm entry types vào index.d.ts
			outDir: "dist", // Output .d.ts vào dist/
			include: ["src/**/*"], // Chỉ xử lý src/
			rollupTypes: true, // Optional: Rollup tất cả .d.ts thành một file (tốt cho thư viện nhỏ)
			tsconfigPath: "./tsconfig.app.json", // Nếu dùng template Vite
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"), // Entry point export tất cả components
			name: "MyUIComponents", // Global name cho UMD nếu cần
			fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`, // Output ESM và CJS
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"], // Không bundle React
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "jsxRuntime",
				},
			},
		},
		assetsDir: "assets", // Thư mục cho assets nếu có (hình ảnh, font)
		cssCodeSplit: false, // Bundle tất cả CSS thành một file (my-ui-components.css)
		assetsInlineLimit: 0,
	},
});
