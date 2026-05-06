import React, { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  editable: boolean;
  multiline?: boolean;
  as?: string;
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
};

/**
 * Inline contentEditable that writes back to the store on blur.
 * Uses React.createElement to keep the polymorphic `as` prop simple for TS.
 */
export default function Editable({
  value,
  onChange,
  editable,
  multiline = false,
  as = 'span',
  className,
  placeholder,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (ref.current && ref.current.innerText !== value) {
      ref.current.innerText = value;
      lastValueRef.current = value;
    }
  }, [value]);

  if (!editable) {
    if (multiline) {
      const lines = value.split('\n');
      return React.createElement(
        as,
        { className, style },
        lines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </React.Fragment>
        )),
      );
    }
    return React.createElement(as, { className, style }, value);
  }

  return React.createElement(
    as,
    {
      ref,
      className,
      style,
      'data-editable': true,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        const next = e.currentTarget.innerText;
        if (next !== lastValueRef.current) {
          lastValueRef.current = next;
          onChange(next);
        }
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      },
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      'data-placeholder': placeholder,
    },
    value,
  );
}
