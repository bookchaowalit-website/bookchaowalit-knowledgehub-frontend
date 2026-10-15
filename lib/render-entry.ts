import { remark } from 'remark';
import html from 'remark-html';

/** Convert the public Markdown entry body to sanitized HTML for reading routes. */
export async function renderEntry(content: string): Promise<string> {
  return (await remark().use(html).process(content)).toString();
}
