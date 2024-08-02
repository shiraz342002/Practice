import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { RoleType } from "../constants";
import { User } from "../modules/user/user.schema";
import { Action } from "./userRoles";

export type Subjects = any;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  async createForUser(user: User) {
    const { can } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>
    );
    const caslPermissions = [];
    if (user.role === RoleType.ADMIN) {
      can(Action.Manage, "all"); // read-write access to everything
      caslPermissions.push({ action: Action.Manage, subject: "all" });
    } else if (user.role === RoleType.USER) {
      can(Action.Create, "all"); // read-write access to everything
      can(Action.Read, "all");
      // Here 👇 subject is the table name
      caslPermissions.push({ action: Action.Create, subject: "all" }); // create access to everything
      caslPermissions.push({ action: Action.Read, subject: "all" }); // read access to everything
      caslPermissions.push({ action: Action.Update, subject: "all" }); // read access to everything
      caslPermissions.push({ action: Action.Delete, subject: "all" });
    } else {
      // can(Action.Update, Article, { authorId: user.id });
      //cannot(Action.Delete, Article, { isPublished: true });
      caslPermissions.push({ action: Action.Create, subject: "all" }); // create access to everything
      caslPermissions.push({ action: Action.Read, subject: "all" }); // read access to everything
      caslPermissions.push({ action: Action.Update, subject: "all" });
      caslPermissions.push({ action: Action.Delete, subject: "all" });
    }

    return new Ability<[Action, Subjects]>(caslPermissions);
  }
}
