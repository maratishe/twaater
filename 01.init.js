// vote: { type=vote, email, vote: { code: number}}  	-- type
// account:  { type=reps, email, info}	 -- type, email
// drills: { type=drillsumary, raw: { code: { email: rate}}}	-- type
// drills: { type=drill, code='dot-prefix', en: 'english desc', jp: 'jp description', creator: email}	-- code, creator
$.io.stringex.keys = $.hvak( $.ttl( 'type,email,code,creator'), true, true);

