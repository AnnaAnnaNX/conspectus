export function parseText (textForEditor: string):string {
  return textForEditor.split("\n")
    .map((text:any) => (text.trim()))
    .filter(text => (text))
    .map((el) => `<div><span class="all">${el}</span></div>`)
    .join("\n");
}
