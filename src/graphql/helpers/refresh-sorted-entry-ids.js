/* eslint camelcase: 0 */
export default async function(textId, db) {
  try {
    const text = await db.Text.findByPk(textId);
    let order = ["properties->'page' ASC", "properties->'sequence' ASC"];
    if (text.entrySort) {
      order = text.entrySort.map(key => `properties->'${key}' ASC`);
    }

    // This feeeeels brittle.
    let [sortedEntryIds] = await db.sequelize.query(`
        SELECT id FROM public.entries WHERE text_id='${textId}'
	      ORDER BY ${order.join(", ")};`);
    sortedEntryIds = sortedEntryIds.map(({ id }) => id);
    return text.update(
      { sortedEntryIds, modifiedAt: new Date() },
      {
        where: {
          id: textId
        },
        returning: true
      }
    );
  } catch (error) {
    console.log("oops", error);
  }
}
