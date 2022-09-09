import { ThemeService } from "./themeService";

export class ThemeAPI {
  //   @validation({
  //     /* rules */
  //   }) // Можно использовать декораторы, можно передавать в middlewares
  public static create = async (request: any, response: any) => {
    const { body } = request;
    console.log(request.body);
    /* Делаем что-то с данными */
    ThemeService.create(body).then(() => {
      response.status(200).send('Theme successfully add')
    }); // Можно обернуть в try..catch
  };

  public static find = async (request: any, response: any) => {
    const { body } = request;
    console.log(body);
    /* Делаем что-то с данными */
    await ThemeService.find({ id: body.id, title: body.title }); // Можно обернуть в try..catch
  };
}
