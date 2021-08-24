export default async (context, locale) => {
  return await context.$http.$get(`${locale}/messages.json`)
}
