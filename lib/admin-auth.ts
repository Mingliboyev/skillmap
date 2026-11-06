export function hasAdminRole(role:string|undefined,allowed:readonly string[]=["editor","researcher","super_admin"]){return!!role&&allowed.includes(role)}
export function canMutateQuestions(role:string|undefined){return hasAdminRole(role,["editor","super_admin"])}
