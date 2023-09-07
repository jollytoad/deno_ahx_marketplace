import { getSessionId } from "$deno_kv_oauth/get_session_id.ts";
import { isReadonly } from "../lib/marketplace.ts";
import { getClaims, type IdClaims } from "../auth/claims.ts";

export async function canEdit(req: Request) {
  if (await isReadonly()) {
    return false;
  }

  const sessionId = getSessionId(req);
  const claims = sessionId && await getClaims<IdClaims>(sessionId);

  return !!claims;
}
