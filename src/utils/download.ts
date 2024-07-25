export function download(url: string, name: string) {
  const a = document.createElement("a");
  a.download = name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
