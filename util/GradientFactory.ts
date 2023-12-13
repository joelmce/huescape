/**
 * @todo need to add comments to these functions
 */

const randomColour = (): number => {
    return Math.round(Math.random() * 360)
}

const getPercentage = (v: number): number => {
    return Math.round((Math.random() * (v * 100)) % 100);
}

// Credit: https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf
const hexToHSL = (hex?: string): number | undefined => {
    if (!hex) return undefined;

    /* If the hex starts with a # then we remove it before continuing */
    hex = hex.replace(/#/g, "");

    /**
     * This is to ensure we have a 6 letter hex string.
     * Example: 123 -> 112233
     */
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("");
    }

    /* Break down the hex string into RGB components */
    let result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
      return undefined;
    }

    /* Make into decimal values */
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    /* Normalise values to the range 0 and 1 */
    (r /= 255), (g /= 255), (b /= 255);

    /* To find the dominant and weakest RGB value */
    let max = Math.max(r, g, b), min = Math.min(r, g, b);

    /* Find the average */
    let h = (max + min) / 2;

    /* 
     * The "fun" part. Here it's calculating the hue based on dominant RGB component.
     * Once we have the dominate colour, we use that as the primary colour. This is 
     * important to make some beautiful palettes. The other colour components will 
     * have similar hues, so we adjust the colour accordingly.
     */
    if (max == min) {
      h = 0;
    } else {
      let d = max - min;
      switch (max) {

        /*
         * The addition of 6 if g < b means it wraps around the colour wheel (so it's
         * calculated in the range[0, 6] 
         */
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        /*
         * This considers the difference between blue (b) and red (r) components and 
         * adds 2 to the result.
         */
        case g:
          h = (b - r) / d + 2;
          break;

        /*
         * This considers the difference between red (r) and green (g) components and 
         * adds 4 to the result.
         */      
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6; // Normalise to HSL range betwee 0 - 1
    }

    /*
     * Think colour wheel. Reference: 
     * https://simple.wikipedia.org/wiki/Color_wheel
     * So we get the hue value (example 0.75) and we multiply
     * by 360 degrees (resulting in 270).
     */
    h = Math.round(360 * h);
  
    return h;
  };

const getHashPercentage = (
    v: number,
    hash: number,
    length: number
): number => {
    return Math.round(((hash / length) * (v * 100)) % 100);
}

const generateColours = (length: number, initialHue: number): string[] => {
    return Array.from({length}, (_, i) => {
        if (i === 0) {
            return `hsl(${initialHue}, 100%, 74%)`
        }

        if(i < length / 1.4) {
            return `hsl(${
                initialHue - 30 * (1 - 2 * (i % 2)) * (i > 2 ? i / 2 : i)
            }, 100%, ${64 - i * (1 - 2 * (i % 2)) * 1.75}%)`;
        }

        return `hsl(${initialHue - 150 * (1 - 2 * (i % 2))}, 100%, ${
            66 - i * (1 - 2 * (i % 2)) * 1.25
        }%)`; 
    })
}

const generateGradient = (length: number, colours: string[], hash?: number) => {
    return Array.from({ length}, (_, i) => {
      // Cheesy indentation
        return `     radial-gradient(at ${
            hash ? getHashPercentage(i, hash, length) : getPercentage(i)
        }% ${hash ? getHashPercentage(i * 10, hash, length) : getPercentage(i * 10)}%, ${
            colours[i]
        } 0px, transparent 55%)`
    })
}

const generateStops = (length: number, base?: number, hash?: number) => {
    const colours = generateColours(length, base ? base : randomColour())

    const properties = generateGradient(length, colours, hash ? hash : undefined)
    return [colours[0], properties.join(", \n")]
}

const generateMeshGradient = (
    length: number,
    base?: string,
    hash?: number
) => {
    const [bgColour, bgImage] = generateStops(
        length, hexToHSL(base) ? hexToHSL(base) : undefined,
        hash ? hash : undefined
    )

    return { backgroundColor: bgColour, backgroundImage: bgImage };
}

export { generateMeshGradient as generateMeshGradient}
