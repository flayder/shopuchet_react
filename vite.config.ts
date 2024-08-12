import { defineConfig, loadEnv } from "vite"
import _ from "lodash"

import react from "@vitejs/plugin-react"
import TsconfigPaths from "vite-tsconfig-paths"
import WindiCSS from "vite-plugin-windicss"
import PluginRewriteAll from "vite-plugin-rewrite-all"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const isEnvEmpty = _.isEmpty(env)
  if (isEnvEmpty) throw new Error(`Please, provide ${mode} env config.`)

  return {
    server: {
      port: 3000,
      host: true
    },
    plugins: [react(), TsconfigPaths(), WindiCSS(), PluginRewriteAll()]
  }
})
