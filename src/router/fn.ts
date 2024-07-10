import {
  switchTab,
  redirectTo,
  navigateTo,
  navigateBack,
  reLaunch,
} from "@tarojs/taro";
import routes from "./modules/index";

type Route = {
  name: string;
  path: string;
};

type RouteOpt = string | Route;

export const routeMap = {};

routes.forEach((v) => {
  routeMap[v.name] = v;
});

function parseQuery(obj: any) {
  if (!obj) obj = {};
  let querystring = "";
  Object.keys(obj).forEach((key, i) => {
    querystring += `${i === 0 ? "" : "&"}${key}=${obj[key]}`;
  });
  return querystring;
}

class Router {
  constructor() {}
  setRoute(route: Route, opts?) {
    if (!opts) opts = {};
    let querystring = parseQuery(opts?.query);
    let url = `${route.path}?${querystring}`;
    console.log("setRoute", route, url, opts);
    if (opts.replace) {
      redirectTo({
        url,
        fail(e) {
          console.error(e);
        },
      });
    } else {
      navigateTo({
        url,
        fail(e) {
          console.error(e);
        },
      });
    }
  }
  go(n: number) {
    navigateBack({
      delta: -n,
    });
  }
  push(opts: RouteOpt) {
    const name = typeof opts === "string" ? opts : opts?.name;
    const route = routeMap[name];
    if (route) {
      this.setRoute(route);
    }
  }
  replace(opts: RouteOpt) {
    const name = typeof opts === "string" ? opts : opts?.name;
    const route = routeMap[name];
    if (route) {
      this.setRoute(route, { replace: true });
    }
  }
}

const router = new Router();

export default router;
