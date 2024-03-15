"use strict";

import { Application } from "express";
import user from "./user.route";

export const initRoutes = (app: Application, baseUrl = "/api") => {
  try {
    app.use(baseUrl + `/users`, user);
  } catch (error) {
    console.log("EROOOOOORRRRRRRRRRR");
    console.log("[EXPRESS-SERVER]: Error loading routes ❌");
  }
};
