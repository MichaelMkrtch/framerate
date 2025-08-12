import { CSSProperties, ReactNode, useState } from 'react';

import {
  DisplacementOptions,
  getDisplacementFilter,
} from './get-displacement-filter';
import { getDisplacementMap } from './get-displacement-map';

type GlassElementProps = DisplacementOptions & {
  children?: ReactNode | undefined;
  blur?: number;
  debug?: boolean;
};

export const GlassElement = ({
  height,
  width,
  depth: baseDepth,
  radius,
  children,
  strength,
  chromaticAberration,
  blur = 2,
  debug = false,
}: GlassElementProps) => {
  const [clicked, setClicked] = useState(false);
  const depth = baseDepth / (clicked ? 0.7 : 1);

  const style: CSSProperties = {
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${radius}px`,
    backdropFilter: `blur(${blur / 2}px) url('${getDisplacementFilter({
      height,
      width,
      radius,
      depth,
      strength,
      chromaticAberration,
    })}') blur(${blur}px) brightness(1.1) saturate(1.5) `,
  };

  /* Debug mode: display the displacement map instead of actual effect */
  if (debug === true) {
    style.background = `url("${getDisplacementMap({
      height,
      width,
      radius,
      depth,
    })}")`;
    style.boxShadow = 'none';
  }
  return (
    <div
      className="flex items-center justify-center bg-black/50 inset-shadow-[0_0_2px_0_rgba(255,255,255,0.45)]"
      style={style}
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)}
    >
      {children}
    </div>
  );
};
