const { withDangerousMod, IOSConfig, AndroidConfig } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const withCustomDrawables = (config) => {
	return withDangerousMod(config, [
		"android",
		async (config) => {
			const drawableDir = path.join(
				config.modRequest.platformProjectRoot,
				"app/src/main/res/drawable"
			);

			// Criar diretório se não existir
			if (!fs.existsSync(drawableDir)) {
				fs.mkdirSync(drawableDir, { recursive: true });
			}

			// Copiar seus drawables
			const sourceDrawablesDir = path.join(config.modRequest.projectRoot, "assets/drawables");

			if (fs.existsSync(sourceDrawablesDir)) {
				const files = fs.readdirSync(sourceDrawablesDir);
				files.forEach((file) => {
					fs.copyFileSync(
						path.join(sourceDrawablesDir, file),
						path.join(drawableDir, file)
					);
				});
			}

			return config;
		},
	]);
};

module.exports = withCustomDrawables;
