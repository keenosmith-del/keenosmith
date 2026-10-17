import common from "./common.json";
import ai from "./ai.json";
import cloud from "./cloud.json";
import fullStack from "./full-stack.json";

export const defaultCVType = "full-stack";
export const cvVersions = [ai, cloud, fullStack].map(version => ({ ...common, ...version }));
export const cvByType = Object.fromEntries(cvVersions.map(version => [version.key, version]));
