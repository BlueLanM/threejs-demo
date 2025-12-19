import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/threejs-demo/', // 设置为你的仓库名
	build: {
		outDir: 'docs'
	}
});
