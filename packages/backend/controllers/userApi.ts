import { UserService } from "./userService";

export class UserAPI {
  //   @validation({
  //     /* rules */
  //   }) // Можно использовать декораторы, можно передавать в middlewares
  public static create = async (request: any, response: any) => {
    const { body } = request;
    UserService.create(body).then((data) => {
      response.status(200).send(data);
    });
  };

  public static find = async (request: any, response: any) => {
    const { body } = request;
    await UserService.find({ id: body.id });
  };

  public static findUser = async (request: any, response: any) => {
    const { login } = request.query;
    if (login) {
      const result = await UserService.findUser({ login: login });
      if (result) {
        response.status(200).send(result);
      } else {
        response.status(400).send("User not found");
      }
    }
  };
}
