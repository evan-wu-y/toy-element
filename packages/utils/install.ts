import type { App, Plugin } from 'vue';
import { each } from 'lodash-es';

type SFCWithInstall<T> = T & Plugin;

export function makeInstaller(comp: Plugin[]) {
  const installer = (app: App) => {
    each(comp, (item) => {
      app.use(item);
    });
  };
  return installer as Plugin;
}

export const withInstall = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name;
    app.component(name, comp as Plugin);
  };
  return comp as SFCWithInstall<T>;
};
