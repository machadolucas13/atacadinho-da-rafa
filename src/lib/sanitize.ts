export function sanitizeHtml(dirty: string): string {
  if (typeof DOMParser !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(dirty, "text/html");

    const all = Array.from(doc.body.querySelectorAll("*"));
    for (const el of all) {
      const tag = el.tagName.toLowerCase();
      if (["script", "iframe", "object", "embed", "form", "input", "button"].includes(tag)) {
        el.remove();
        continue;
      }
      Array.from(el.attributes).forEach((attr) => {
        if (/^on/i.test(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    }

    return doc.body.innerHTML;
  }

  return dirty
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/<form[\s\S]*?>[\s\S]*?<\/form>/gi, "")
    .replace(/\s+on\w+="[^"]*"/gi, " ")
    .replace(/\s+on\w+='[^']*'/gi, " ");
}
