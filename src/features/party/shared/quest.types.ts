import { z } from "zod";
import { newQuestSchema } from "./quest.schemas";

export type NewQuest = z.infer<typeof newQuestSchema>;
