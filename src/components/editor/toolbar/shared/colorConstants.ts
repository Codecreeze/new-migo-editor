export interface ColorInfo {
  id: number;
  name: string;
  code: string;
}

export const PREDEFINED_COLORS: ColorInfo[] = [
  // Row 1 - Grayscale
  { id: 1, name: "Black", code: "#000000" },
  { id: 2, name: "Dark Gray", code: "#333333" },
  { id: 3, name: "Medium Gray", code: "#666666" },
  { id: 4, name: "Gray", code: "#999999" },
  { id: 5, name: "Light Gray", code: "#cccccc" },
  { id: 6, name: "Lighter Gray", code: "#dddddd" },
  { id: 7, name: "Very Light Gray", code: "#eeeeee" },
  { id: 8, name: "White", code: "#ffffff" },
  
  // Row 2 - Primary Colors
  { id: 9, name: "Red", code: "#ff0000" },
  { id: 10, name: "Orange", code: "#ff8000" },
  { id: 11, name: "Yellow Orange", code: "#ffaa00" },
  { id: 12, name: "Yellow", code: "#ffff00" },
  { id: 13, name: "Lime", code: "#80ff00" },
  { id: 14, name: "Cyan", code: "#00ffff" },
  { id: 15, name: "Blue", code: "#0080ff" },
  { id: 16, name: "Purple", code: "#8000ff" },
  
  // Row 3 - Light Tints
  { id: 17, name: "Light Pink", code: "#ffcccc" },
  { id: 18, name: "Light Peach", code: "#ffddcc" },
  { id: 19, name: "Light Cream", code: "#ffeecc" },
  { id: 20, name: "Light Yellow", code: "#ffffcc" },
  { id: 21, name: "Light Green", code: "#eeffcc" },
  { id: 22, name: "Light Mint", code: "#ccffee" },
  { id: 23, name: "Light Sky", code: "#ccddff" },
  { id: 24, name: "Light Lavender", code: "#ddccff" },
  
  // Row 4 - Medium Tints
  { id: 25, name: "Pink", code: "#ff9999" },
  { id: 26, name: "Peach", code: "#ffbb99" },
  { id: 27, name: "Light Orange", code: "#ffdd99" },
  { id: 28, name: "Light Lime", code: "#ffff99" },
  { id: 29, name: "Mint Green", code: "#ddff99" },
  { id: 30, name: "Aqua", code: "#99ffdd" },
  { id: 31, name: "Sky Blue", code: "#99bbff" },
  { id: 32, name: "Lavender", code: "#bb99ff" },
  
  // Row 5 - Bright Colors
  { id: 33, name: "Bright Red", code: "#ff3333" },
  { id: 34, name: "Bright Orange", code: "#ff7733" },
  { id: 35, name: "Bright Yellow", code: "#ffbb33" },
  { id: 36, name: "Bright Lime", code: "#bbff33" },
  { id: 37, name: "Bright Green", code: "#77ff33" },
  { id: 38, name: "Bright Cyan", code: "#33ffbb" },
  { id: 39, name: "Bright Blue", code: "#3377ff" },
  { id: 40, name: "Bright Purple", code: "#7733ff" },
  
  // Row 6 - Dark Colors
  { id: 41, name: "Dark Red", code: "#cc0000" },
  { id: 42, name: "Dark Orange", code: "#cc6600" },
  { id: 43, name: "Dark Yellow", code: "#cc9900" },
  { id: 44, name: "Dark Lime", code: "#99cc00" },
  { id: 45, name: "Dark Green", code: "#66cc00" },
  { id: 46, name: "Dark Cyan", code: "#00cc66" },
  { id: 47, name: "Dark Blue", code: "#0066cc" },
  { id: 48, name: "Dark Purple", code: "#6600cc" },
  
  // Row 7 - Darker Colors
  { id: 49, name: "Darker Red", code: "#990000" },
  { id: 50, name: "Darker Orange", code: "#994400" },
  { id: 51, name: "Darker Yellow", code: "#997700" },
  { id: 52, name: "Darker Lime", code: "#779900" },
  { id: 53, name: "Darker Green", code: "#449900" },
  { id: 54, name: "Darker Cyan", code: "#009944" },
  { id: 55, name: "Darker Blue", code: "#004499" },
  { id: 56, name: "Darker Purple", code: "#440099" },
];

// Helper function to chunk colors into rows of specified size
export const chunkColors = (
  colors: ColorInfo[],
  chunkSize: number,
): ColorInfo[][] => {
  const chunks: ColorInfo[][] = [];
  for (let i = 0; i < colors.length; i += chunkSize) {
    chunks.push(colors.slice(i, i + chunkSize));
  }
  return chunks;
};
