function npcBarrier (input, npc) {
  return input.replace(/\[bt]/g, `${npc.barrier} barrier tick${npc.barrier === 1 ? '' : 's'}`)
}

export default npcBarrier
