import { SiteTheme } from "../models/siteTheme.model";
import { User } from "../models/user.model";
import { UserTheme } from "../models/userTheme.model";

export function modelsReturn() {
  return [User, SiteTheme, UserTheme];
}
