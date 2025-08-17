import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "ui",
			formats: ["es", "cjs", "umd"],
			fileName: (format) => `ui.${format}.js`,
		},
		rollupOptions: {
			external: Object.keys(peerDependencies),
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "ReactJSX",
				},
			},
		},
	},
	plugins: [
		react(),
		dts({
			exclude: ["**/*.test.ts", "**/*.stories.ts"], // Loại trừ các file không cần thiết
			insertTypesEntry: true, // Thêm entry types vào index.d.ts
			outDir: "dist", // Output .d.ts vào dist/
			// include: ["src/**/*"], // Chỉ xử lý src/
			// rollupTypes: true, // Optional: Rollup tất cả .d.ts thành một file (tốt cho thư viện nhỏ)
			tsconfigPath: "./tsconfig.app.json", // Nếu dùng template Vite
		}),
	],
});
