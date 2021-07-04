import { useState } from 'react';
import settingConstants from '../../constants/settingConstants';

const {
  REPEAT_COLOR,
  REPEAT_HOVER_COLOR,
} = settingConstants;

function Repeat(): JSX.Element {
  const [color, setColor] = useState(REPEAT_COLOR);

  const handleMouseOver = (): void => {
    setColor(REPEAT_HOVER_COLOR);
  };

  const handleMouseOut = (): void => {
    setColor(REPEAT_COLOR);
  };

  return (
    <svg
      viewBox="0 -256 1792 1792"
      id="svg3037"
      version="1.1"
      width="100%"
      height="100%"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <metadata
        id="metadata3047"
      />
      <defs
        id="defs3045"
      />
      <g
        transform="matrix(1,0,0,-1,121.49153,1277.8305)"
        id="g3039"
      >
        <path
          d="M 1536,1280 V 832 q 0,-26 -19,-45 -19,-19 -45,-19 h -448 q -42,0 -59,40 -17,39 14,69 l 138,138 Q 969,1152 768,1152 664,1152 569.5,1111.5 475,1071 406,1002 337,933 296.5,838.5 256,744 256,640 256,536 296.5,441.5 337,347 406,278 475,209 569.5,168.5 664,128 768,128 q 169,0 304,99.5 135,99.5 185,261.5 7,23 30,23 h 199 q 16,0 25,-12 10,-13 7,-27 Q 1479,298 1370.5,161 1262,24 1104.5,-52 947,-128 768,-128 612,-128 470,-67 328,-6 225,97 122,200 61,342 0,484 0,640 q 0,156 61,298 61,142 164,245 103,103 245,164 142,61 298,61 147,0 284.5,-55.5 Q 1190,1297 1297,1196 l 130,129 q 29,31 70,14 39,-17 39,-59 z"
          id="path3041"
          fill={color}
        />
      </g>
    </svg>
  );
}

export default Repeat;
