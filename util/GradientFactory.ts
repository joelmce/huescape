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
    hex = hex.replace(/#/g, "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("");
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
      return undefined;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h = (max + min) / 2;
    if (max == min) {
      h = 0;
    } else {
      var d = max - min;
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
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
        return `radial-gradient(at ${
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
