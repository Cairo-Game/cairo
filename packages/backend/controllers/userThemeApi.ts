import { ThemeService } from "./themeService";
import { UserThemeService } from "./userThemeService";

export class UserThemeAPI {
  //   @validation({
  //     /* rules */
  //   }) // Можно использовать декораторы, можно передавать в middlewares
  public static create = async (request: any, response: any) => {
    const { body } = request;
    UserThemeService.create(body).then(() => {
      response.status(200).send("User-Theme successfully add");
    });
  };

  public static change = async (request: any, response: any) => {
    const { body } = request;
    const result = await UserThemeService.change(body);
    if (result) {
      response.status(200).send(result);
    } else {
      response.status(400);
    }
  };

  public static find = async (request: any, response: any) => {
    const { body } = request;
    UserThemeService.find({ id: body.id, title: body.title }).then((theme) => {
      response.status(200).send(theme);
    });
  };

  public static findByUser = async (request: any, response: any) => {
    const { id } = request.query;
    const result = await UserThemeService.findByUser({ id: id });
    if (result) {
      response.status(200).send(result);
    } else {
      response.status(400).send("Theme does not set");
    }
  };
}
