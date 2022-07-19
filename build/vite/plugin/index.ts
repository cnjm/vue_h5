import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import windiCSS from "vite-plugin-windicss";
import { configStyleImportPlugin } from "./styleImport";
import { configSvgIconsPlugin } from "./svgSprite";
import { configViteMockServePlugin } from "./viteMockServe";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    // use vueJsx
    // vueJsx(),
    // https://www.npmjs.com/package/vite-plugin-vue-setup-extend
    vueSetupExtend(),
  ];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  // svg
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // style import
  vitePlugins.push(configStyleImportPlugin());

  // mock
  VITE_USE_MOCK && vitePlugins.push(configViteMockServePlugin(isBuild, VITE_USE_MOCK));

  return vitePlugins;
}
