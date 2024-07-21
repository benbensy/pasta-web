import { Highlight, themes } from "prism-react-renderer";

interface Props {
  code: string;
  lang: string;
}

export function CodeViewer({ code, lang }: Props) {
  return (
    <Highlight theme={themes.oneLight} code={code} language={lang}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
