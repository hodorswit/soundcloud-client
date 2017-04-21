import { schema } from "normalizr";
import userSchema from "./user";

const trackSchema = new schema.Entity("tracks", { user: userSchema });

export default trackSchema;
