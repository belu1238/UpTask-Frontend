import type { Project, TeamMember } from "../types";

export const isManager = (manager: Project['_id'], userId: TeamMember['_id']) => manager === userId
