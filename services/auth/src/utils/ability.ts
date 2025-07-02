import {
  Ability,
  AbilityBuilder,
  createMongoAbility,
  RawRule,
  MongoQuery,
  Subject,
} from "@casl/ability";
import { Permission } from "../middleware/introspect";


// Define proper types based on your schema
export type AppSubjects = 
  | "User" 
  | "Role"
  | "Hotel"
  | "Room"
  | "RoomType"
  | "Guest"
  | "Amenity"
  | "Reservation"
  |"ExchangeRate"
  | "Folio"
  | "POSOutlet"
  | "RatePlan"
  | "HouseKeeping"
  | "Maintenance"
  | "GroupProfile"
  | "all";

export type AppActions = "create" | "read" | "update" | "delete" | "manage";
export type AppAbility = Ability<[AppActions, AppSubjects]>;



export async function defineAbilitiesForUser(
  Permissions:Permission[] // Changed to string for CUID
): Promise<AppAbility> {

  try {
    

    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    for (const permission of Permissions) {
      try {

        if (
          isValidAction(permission.action) &&
          isValidSubject(permission.subject)
        ) {
          can(
            permission.action as AppActions,
            permission.subject as AppSubjects,
          );
        }
      } catch (error) {
        console.warn(
          `Invalid permission :`,
          permission,
          error
        );
      }
    }

    const ability = build();

    return ability;
  } catch (error) {
    console.error(`Error defining abilities `, error);
    throw new Error("Failed to define abilities");
  }
}


function isValidAction(action: string): action is AppActions {
  return ["create", "read", "update", "delete", "manage"].includes(action);
}

function isValidSubject(subject: string): subject is AppSubjects {
  return [
    "User",
    "Role",
    "Hotel",
    "Room",
    "Amenity",
    "ExchangeRate",
    "RoomType",
    "Guest",
    "Reservation",
    "Folio",
    "POSOutlet",
    "RatePlan",
    "HouseKeeping",
    "Maintenance",
    "GroupProfile",
    "all"
  ].includes(subject);
}

export const createAbility = (rules: RawRule[]): AppAbility =>
  createMongoAbility(rules as any, {
    detectSubjectType: (object: any) => {
      if (object.__typename) return object.__typename;
      if (object.constructor?.name) return object.constructor.name;
      if (typeof object === "string") return object;
      return "Unknown";
    },
  });