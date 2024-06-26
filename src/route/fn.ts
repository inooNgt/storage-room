import routes from "./modules/index";

const routeMap = {};

routes.forEach((v) => {
  routeMap[v.name] = v;
});

export default {
  routeMap,
};
